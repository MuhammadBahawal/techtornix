import { connectDB, corsMiddleware, handleError } from '../_middleware.js';
import mongoose from 'mongoose';

// Service Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  icon: { type: String },
  features: [{ type: String }],
  technologies: [{ type: String }],
  pricing: {
    starting: { type: Number },
    currency: { type: String, default: 'USD' }
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const services = await Service.find({ isActive: true }).sort({ order: 1 });
      res.status(200).json(services);

    } else if (req.method === 'POST') {
      const serviceData = req.body;
      const service = new Service(serviceData);
      await service.save();
      res.status(201).json(service);

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    handleError(res, error, 'Services operation failed');
  }
}
