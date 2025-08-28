const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
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
  icon: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  technologies: [String],
  clientsServed: {
    type: Number,
    default: 0
  },
  testimonials: [{
    name: String,
    company: String,
    message: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    avatar: String
  }],
  caseStudies: [{
    title: String,
    description: String,
    image: String,
    link: String,
    technologies: [String]
  }],
  pricing: {
    startingPrice: Number,
    currency: {
      type: String,
      default: 'USD'
    }
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

module.exports = mongoose.model('Service', serviceSchema);
