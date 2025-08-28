import { connectDB, corsMiddleware, handleError } from '../_middleware.js';
import mongoose from 'mongoose';

// Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], required: true },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  benefits: [{ type: String }],
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'USD' }
  },
  isActive: { type: Boolean, default: true },
  applicationDeadline: { type: Date },
  postedBy: { type: String, required: true }
}, { timestamps: true });

// Application Schema
const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  resume: { type: String }, // URL to resume file
  coverLetter: { type: String },
  experience: { type: String },
  portfolio: { type: String },
  status: { type: String, enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'], default: 'pending' },
  notes: { type: String }
}, { timestamps: true });

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const { type, department } = req.query;
      let query = { isActive: true };
      
      if (type) query.type = type;
      if (department) query.department = department;

      const jobs = await Job.find(query).sort({ createdAt: -1 });
      res.status(200).json(jobs);

    } else if (req.method === 'POST') {
      const { jobId, ...applicationData } = req.body;
      
      if (jobId) {
        // Submit job application
        const application = new Application({
          jobId,
          ...applicationData
        });
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully', id: application._id });
      } else {
        // Create new job (admin only)
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
      }

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    handleError(res, error, 'Careers operation failed');
  }
}
