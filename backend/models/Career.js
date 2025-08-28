const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: ['development', 'design', 'marketing', 'management', 'qa', 'devops', 'hr']
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship']
  },
  experience: {
    min: Number,
    max: Number,
    level: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'lead']
    }
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [String],
  requirements: [String],
  preferredSkills: [String],
  benefits: [String],
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    isNegotiable: {
      type: Boolean,
      default: true
    }
  },
  applicationDeadline: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  isExpired: {
    type: Boolean,
    default: false
  },
  applicationsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    required: true
  },
  applicant: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    cnic: {
      type: String,
      required: true
    }
  },
  resume: {
    filename: String,
    originalName: String,
    path: String,
    size: Number
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'rejected', 'hired'],
    default: 'pending'
  },
  notes: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date
}, {
  timestamps: true
});

const Career = mongoose.model('Career', careerSchema);
const Application = mongoose.model('Application', applicationSchema);

module.exports = { Career, Application };
