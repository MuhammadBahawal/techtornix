import { connectDB, corsMiddleware, handleError } from '../_middleware.js';
import mongoose from 'mongoose';

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String },
  page: { type: String, required: true },
  referrer: { type: String },
  country: { type: String },
  city: { type: String },
  device: { type: String },
  browser: { type: String },
  os: { type: String },
  sessionId: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get analytics data (admin only)
      const { period = '7d' } = req.query;
      
      let startDate = new Date();
      switch (period) {
        case '1d':
          startDate.setDate(startDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(startDate.getDate() - 30);
          break;
        default:
          startDate.setDate(startDate.getDate() - 7);
      }

      const analytics = await Analytics.find({
        createdAt: { $gte: startDate }
      }).sort({ createdAt: -1 });

      // Calculate stats
      const totalVisits = analytics.length;
      const uniqueVisitors = new Set(analytics.map(a => a.ip)).size;
      const topPages = {};
      const topCountries = {};

      analytics.forEach(visit => {
        topPages[visit.page] = (topPages[visit.page] || 0) + 1;
        if (visit.country) {
          topCountries[visit.country] = (topCountries[visit.country] || 0) + 1;
        }
      });

      res.status(200).json({
        totalVisits,
        uniqueVisitors,
        topPages: Object.entries(topPages).sort((a, b) => b[1] - a[1]).slice(0, 10),
        topCountries: Object.entries(topCountries).sort((a, b) => b[1] - a[1]).slice(0, 10),
        recentVisits: analytics.slice(0, 50)
      });

    } else if (req.method === 'POST') {
      // Track new visit
      const analyticsData = req.body;
      const analytics = new Analytics({
        ...analyticsData,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
      });
      
      await analytics.save();
      res.status(201).json({ message: 'Analytics tracked' });

    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }

  } catch (error) {
    handleError(res, error, 'Analytics operation failed');
  }
}
