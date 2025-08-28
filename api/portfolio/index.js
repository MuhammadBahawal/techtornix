import { connectDB, corsMiddleware, handleError } from '../_middleware.js';
import mongoose from 'mongoose';

// Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  category: { type: String, required: true },
  technologies: [{ type: String }],
  images: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  client: { type: String },
  duration: { type: String },
  teamSize: { type: Number }
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const { featured, category } = req.query;
      let query = { isActive: true };
      
      if (featured === 'true') {
        query.featured = true;
      }
      
      if (category) {
        query.category = category;
      }

      const projects = await Portfolio.find(query).sort({ order: 1, createdAt: -1 });
      res.status(200).json(projects);

    } else if (req.method === 'POST') {
      const projectData = req.body;
      const project = new Portfolio(projectData);
      await project.save();
      res.status(201).json(project);

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    handleError(res, error, 'Portfolio operation failed');
  }
}
