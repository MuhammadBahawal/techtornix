const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  country: String,
  city: String,
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  browser: String,
  os: String,
  referrer: String,
  landingPage: String,
  currentPage: String,
  timeOnPage: {
    type: Number,
    default: 0
  },
  pageViews: [{
    page: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    timeSpent: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
analyticsSchema.index({ createdAt: 1 });
analyticsSchema.index({ isActive: 1 });
analyticsSchema.index({ ipAddress: 1 });

// Method to update last activity
analyticsSchema.methods.updateActivity = function(page) {
  this.lastActivity = new Date();
  this.currentPage = page;
  
  // Add page view
  this.pageViews.push({
    page: page,
    timestamp: new Date()
  });
  
  return this.save();
};

// Static method to get active sessions count
analyticsSchema.statics.getActiveSessionsCount = function() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return this.countDocuments({
    lastActivity: { $gte: fiveMinutesAgo },
    isActive: true
  });
};

// Static method to get today's stats
analyticsSchema.statics.getTodayStats = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: today }
      }
    },
    {
      $group: {
        _id: null,
        totalVisitors: { $sum: 1 },
        totalPageViews: { $sum: { $size: '$pageViews' } },
        uniqueCountries: { $addToSet: '$country' },
        deviceBreakdown: {
          $push: '$device'
        }
      }
    },
    {
      $project: {
        _id: 0,
        totalVisitors: 1,
        totalPageViews: 1,
        uniqueCountries: { $size: '$uniqueCountries' },
        deviceBreakdown: 1
      }
    }
  ]);
};

module.exports = mongoose.model('Analytics', analyticsSchema);
