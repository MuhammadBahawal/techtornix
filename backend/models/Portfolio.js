const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'ai', 'saas', 'iot', 'uiux', 'marketing']
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  technologies: [String],
  client: {
    name: String,
    company: String,
    logo: String
  },
  projectUrl: String,
  githubUrl: String,
  features: [String],
  challenges: [String],
  solutions: [String],
  results: {
    metrics: [{
      label: String,
      value: String,
      improvement: String
    }],
    testimonial: {
      message: String,
      author: String,
      position: String,
      company: String
    }
  },
  duration: {
    start: Date,
    end: Date
  },
  teamSize: Number,
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'maintenance'],
    default: 'completed'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
