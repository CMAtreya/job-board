const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Organization Schema
const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    default: '1-10'
  },
  foundedYear: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Job Schema
const jobSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internship'],
    default: 'Full-Time'
  },
  salary: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  expiryDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Application Schema
const applicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'rejected', 'hired'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    default: ''
  },
  resume: {
    type: String,
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create models from schemas
const Organization = mongoose.model('Organization', organizationSchema, 'organizations');
const Job = mongoose.model('Job', jobSchema, 'jobs');
const Application = mongoose.model('Application', applicationSchema, 'applications');

module.exports = {
  Organization,
  Job,
  Application
};