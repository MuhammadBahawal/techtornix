import { connectDB, corsMiddleware, handleError } from '../_middleware.js';
import mongoose from 'mongoose';

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  ipAddress: { type: String },
  userAgent: { type: String }
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'POST') {
      const { name, email, phone, company, subject, message } = req.body;

      // Validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: 'Name, email, subject, and message are required' 
        });
      }

      // Create contact entry
      const contact = new Contact({
        name,
        email,
        phone,
        company,
        subject,
        message,
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
      });

      await contact.save();

      res.status(201).json({
        message: 'Contact form submitted successfully',
        id: contact._id
      });

    } else if (req.method === 'GET') {
      // Get all contacts (admin only)
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json(contacts);

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    handleError(res, error, 'Contact form submission failed');
  }
}
