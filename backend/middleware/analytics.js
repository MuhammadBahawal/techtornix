const Analytics = require('../models/Analytics');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');

const analyticsMiddleware = async (req, res, next) => {
  try {
    // Skip analytics for API routes and admin routes
    if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
      return next();
    }

    const sessionId = req.sessionID || req.headers['x-session-id'] || `session-${Date.now()}-${Math.random()}`;
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];
    
    // Parse user agent
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    
    // Get geo location
    const geo = geoip.lookup(ipAddress);
    
    // Determine device type
    let device = 'desktop';
    if (result.device.type === 'mobile') device = 'mobile';
    else if (result.device.type === 'tablet') device = 'tablet';

    // Find or create analytics session
    let session = await Analytics.findOne({ sessionId });
    
    if (!session) {
      session = new Analytics({
        sessionId,
        ipAddress,
        userAgent,
        country: geo?.country || 'Unknown',
        city: geo?.city || 'Unknown',
        device,
        browser: result.browser.name || 'Unknown',
        os: result.os.name || 'Unknown',
        referrer: req.headers.referer || '',
        landingPage: req.path,
        currentPage: req.path
      });
    } else {
      // Update existing session
      await session.updateActivity(req.path);
    }

    await session.save();
    
    // Add session to request for potential use in routes
    req.analyticsSession = session;
    
    next();
  } catch (error) {
    console.error('Analytics middleware error:', error);
    next(); // Continue even if analytics fails
  }
};

// Cleanup old sessions (older than 24 hours)
const cleanupOldSessions = async () => {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await Analytics.updateMany(
      { lastActivity: { $lt: oneDayAgo } },
      { isActive: false }
    );
  } catch (error) {
    console.error('Session cleanup error:', error);
  }
};

// Run cleanup every hour
setInterval(cleanupOldSessions, 60 * 60 * 1000);

module.exports = analyticsMiddleware;
