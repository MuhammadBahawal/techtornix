import { corsMiddleware } from './_middleware.js';

export default async function handler(req, res) {
  // Handle CORS
  if (corsMiddleware(req, res)) return;

  res.status(200).json({
    message: 'Techtornix API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/login',
      blog: '/api/blog',
      contact: '/api/contact',
      services: '/api/services',
      portfolio: '/api/portfolio',
      careers: '/api/careers',
      admin: '/api/admin'
    }
  });
}
