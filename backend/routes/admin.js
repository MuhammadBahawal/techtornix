const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Analytics = require('../models/Analytics');
const { adminAuth, generateToken } = require('../middleware/auth');
const User = require('../models/User');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');
const { Career, Application } = require('../models/Career');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');

const router = express.Router();

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({ 
        message: 'Please provide username/email and password' 
      });
    }

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is locked
    if (admin.isLocked) {
      return res.status(423).json({ 
        message: 'Account is temporarily locked. Please try again later.' 
      });
    }

    // Verify password
    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(admin.toJWT());

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   POST /api/admin/verify-token
// @desc    Verify JWT token
// @access  Private
router.post('/verify-token', adminAuth, async (req, res) => {
  try {
    res.json({
      valid: true,
      admin: {
        id: req.admin._id,
        username: req.admin.username,
        email: req.admin.email,
        role: req.admin.role
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

// @route   POST /api/admin/logout
// @desc    Admin logout
// @access  Private
router.post('/logout', adminAuth, async (req, res) => {
  try {
    // In a more sophisticated setup, you might want to blacklist the token
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during logout' });
  }
});

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics with real-time analytics
// @access  Private (Admin only)
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const [
      totalServices,
      totalPortfolio,
      totalJobs,
      totalApplications,
      totalBlogs,
      totalContacts,
      recentContacts,
      recentApplications,
      activeVisitors,
      todayStats
    ] = await Promise.all([
      Service.countDocuments({ isActive: true }),
      Portfolio.countDocuments({ isActive: true }),
      Career.countDocuments({ isActive: true, isExpired: false }),
      Application.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Contact.countDocuments(),
      Contact.find({ isRead: false }).sort({ createdAt: -1 }).limit(5),
      Application.find().populate('jobId', 'title').sort({ createdAt: -1 }).limit(5),
      Analytics.getActiveSessionsCount(),
      Analytics.getTodayStats()
    ]);

    const stats = {
      overview: {
        totalServices,
        totalPortfolio,
        totalJobs,
        totalApplications,
        totalBlogs,
        totalContacts
      },
      analytics: {
        activeVisitors,
        todayVisitors: todayStats[0]?.totalVisitors || 0,
        todayPageViews: todayStats[0]?.totalPageViews || 0,
        uniqueCountries: todayStats[0]?.uniqueCountries || 0
      },
      recent: {
        contacts: recentContacts,
        applications: recentApplications
      }
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/analytics/realtime
// @desc    Get real-time analytics data
// @access  Private (Admin only)
router.get('/analytics/realtime', adminAuth, async (req, res) => {
  try {
    const [activeVisitors, recentSessions] = await Promise.all([
      Analytics.getActiveSessionsCount(),
      Analytics.find({ isActive: true })
        .sort({ lastActivity: -1 })
        .limit(10)
        .select('country city device browser currentPage lastActivity')
    ]);

    res.json({
      activeVisitors,
      recentSessions,
      timestamp: new Date()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private (Admin only)
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [
      contactsByDay,
      applicationsByDay,
      blogViews,
      popularServices
    ] = await Promise.all([
      Contact.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      Application.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      Blog.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
      ]),
      Contact.aggregate([
        { $match: { service: { $exists: true, $ne: null } } },
        { $group: { _id: "$service", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      contactsByDay,
      applicationsByDay,
      totalBlogViews: blogViews[0]?.totalViews || 0,
      popularServices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private (Admin only)
router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const { role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        ...(role && { role }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin only)
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/seed
// @desc    Seed initial data
// @access  Private (Admin only)
router.post('/seed', adminAuth, async (req, res) => {
  try {
    // Check if data already exists
    const existingServices = await Service.countDocuments();
    if (existingServices > 0) {
      return res.status(400).json({ message: 'Data already seeded' });
    }

    // Seed services
    const services = [
      {
        title: 'Website Development',
        slug: 'website-development',
        description: 'Custom web development solutions using modern technologies',
        shortDescription: 'Professional websites that drive results',
        icon: 'web',
        image: '/images/services/web-dev.jpg',
        features: [
          { title: 'Responsive Design', description: 'Mobile-first approach', icon: 'mobile' },
          { title: 'SEO Optimized', description: 'Built for search engines', icon: 'search' }
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
        clientsServed: 150,
        isActive: true,
        order: 1
      },
      {
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        description: 'Native and cross-platform mobile applications',
        shortDescription: 'iOS and Android apps that users love',
        icon: 'mobile',
        image: '/images/services/mobile-dev.jpg',
        features: [
          { title: 'Cross Platform', description: 'iOS and Android', icon: 'devices' },
          { title: 'Native Performance', description: 'Optimized for speed', icon: 'speed' }
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        clientsServed: 85,
        isActive: true,
        order: 2
      }
    ];

    await Service.insertMany(services);

    res.json({ message: 'Initial data seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
