import { connectDB, corsMiddleware, authenticateToken, handleError } from '../_middleware.js';
import mongoose from 'mongoose';

// Admin Schema (same as in login.js but consolidated)
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date }
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get admin dashboard data
      const { action } = req.query;
      
      if (action === 'dashboard') {
        // Get dashboard statistics
        const Contact = mongoose.models.Contact || mongoose.model('Contact', new mongoose.Schema({}, { strict: false }));
        const Blog = mongoose.models.Blog || mongoose.model('Blog', new mongoose.Schema({}, { strict: false }));
        const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', new mongoose.Schema({}, { strict: false }));
        const Job = mongoose.models.Job || mongoose.model('Job', new mongoose.Schema({}, { strict: false }));
        const Application = mongoose.models.Application || mongoose.model('Application', new mongoose.Schema({}, { strict: false }));

        const stats = {
          contacts: await Contact.countDocuments(),
          blogs: await Blog.countDocuments(),
          projects: await Portfolio.countDocuments(),
          jobs: await Job.countDocuments(),
          applications: await Application.countDocuments(),
          recentContacts: await Contact.find().sort({ createdAt: -1 }).limit(5),
          recentApplications: await Application.find().sort({ createdAt: -1 }).limit(5).populate('jobId')
        };

        res.status(200).json(stats);
      } else {
        // Get all admins (super admin only)
        const admins = await Admin.find({}, { password: 0 });
        res.status(200).json(admins);
      }

    } else if (req.method === 'POST') {
      // Create new admin (super admin only)
      const adminData = req.body;
      const admin = new Admin(adminData);
      await admin.save();
      res.status(201).json({ message: 'Admin created successfully', id: admin._id });

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    handleError(res, error, 'Admin operation failed');
  }
}
