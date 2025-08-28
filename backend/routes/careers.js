const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const { Career, Application } = require('../models/Career');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// @route   GET /api/careers
// @desc    Get all active job postings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { department, type, location } = req.query;
    let query = { isActive: true, isExpired: false };

    if (department) query.department = department;
    if (type) query.type = type;
    if (location) query.location = new RegExp(location, 'i');

    const jobs = await Career.find(query)
      .sort({ createdAt: -1 })
      .select('-applicationsCount');

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/careers/:id
// @desc    Get job posting by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Career.findOne({ 
      _id: req.params.id, 
      isActive: true 
    }).select('-applicationsCount');

    if (!job) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/careers/:id/apply
// @desc    Apply for a job
// @access  Public
router.post('/:id/apply', upload.single('resume'), [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters'),
  body('cnic').trim().isLength({ min: 13, max: 15 }).withMessage('CNIC must be 13-15 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Career.findById(req.params.id);
    if (!job || !job.isActive || job.isExpired) {
      return res.status(404).json({ message: 'Job posting not found or expired' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      jobId: req.params.id,
      'applicant.email': req.body.email
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this position' });
    }

    const application = new Application({
      jobId: req.params.id,
      applicant: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        cnic: req.body.cnic
      },
      resume: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size
      },
      coverLetter: req.body.coverLetter
    });

    await application.save();

    // Update applications count
    await Career.findByIdAndUpdate(req.params.id, {
      $inc: { applicationsCount: 1 }
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/careers
// @desc    Create a new job posting
// @access  Private (Admin only)
router.post('/', adminAuth, [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('department').isIn(['development', 'design', 'marketing', 'management', 'qa', 'devops', 'hr']).withMessage('Invalid department'),
  body('type').isIn(['full-time', 'part-time', 'contract', 'internship']).withMessage('Invalid job type'),
  body('location').trim().isLength({ min: 2 }).withMessage('Location is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = new Career(req.body);
    await job.save();

    res.status(201).json({
      message: 'Job posting created successfully',
      job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/careers/admin/applications
// @desc    Get all applications (Admin only)
// @access  Private (Admin only)
router.get('/admin/applications', adminAuth, async (req, res) => {
  try {
    const { status, jobId } = req.query;
    let query = {};

    if (status) query.status = status;
    if (jobId) query.jobId = jobId;

    const applications = await Application.find(query)
      .populate('jobId', 'title department')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/careers/admin/applications/:id
// @desc    Update application status
// @access  Private (Admin only)
router.put('/admin/applications/:id', adminAuth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        reviewedBy: req.user.userId,
        reviewedAt: new Date()
      },
      { new: true }
    ).populate('jobId', 'title department');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
