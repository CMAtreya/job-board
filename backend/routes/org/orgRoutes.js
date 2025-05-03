const express = require('express');
const router = express.Router();
const { Organization, Job, Application } = require('../../dbSchema/orgschema/orgSchema');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to authenticate organization
const authOrg = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const organization = await Organization.findById(decoded.id);
    
    if (!organization) {
      return res.status(401).json({ message: 'Invalid authentication' });
    }
    
    req.organization = organization;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

// Organization registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if organization already exists
    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization with this email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new organization
    const organization = new Organization({
      name,
      email,
      password: hashedPassword
    });
    
    await organization.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: organization._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.status(201).json({
      message: 'Organization registered successfully',
      token,
      organization: {
        id: organization._id,
        name: organization.name,
        email: organization.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Organization login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find organization by email
    const organization = await Organization.findOne({ email });
    if (!organization) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: organization._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      message: 'Login successful',
      token,
      organization: {
        id: organization._id,
        name: organization.name,
        email: organization.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get organization profile
router.get('/profile', authOrg, async (req, res) => {
  try {
    const organization = await Organization.findById(req.organization._id).select('-password');
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// Update organization profile
router.put('/profile', authOrg, async (req, res) => {
  try {
    const { name, description, website, location, industry, size, foundedYear, logo } = req.body;
    
    const organization = await Organization.findById(req.organization._id);
    
    if (name) organization.name = name;
    if (description) organization.description = description;
    if (website) organization.website = website;
    if (location) organization.location = location;
    if (industry) organization.industry = industry;
    if (size) organization.size = size;
    if (foundedYear) organization.foundedYear = foundedYear;
    if (logo) organization.logo = logo;
    
    organization.updatedAt = Date.now();
    
    await organization.save();
    
    res.json({
      message: 'Profile updated successfully',
      organization: {
        id: organization._id,
        name: organization.name,
        email: organization.email,
        description: organization.description,
        website: organization.website,
        location: organization.location,
        industry: organization.industry,
        size: organization.size,
        foundedYear: organization.foundedYear,
        logo: organization.logo
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// Create a new job
router.post('/job', authOrg, async (req, res) => {
  try {
    const { title, description, location, type, salary, tags, expiryDate } = req.body;
    
    const job = new Job({
      organization: req.organization._id,
      title,
      description,
      location,
      type,
      salary,
      tags,
      expiryDate
    });
    
    await job.save();
    
    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
});

// Get all jobs for an organization
router.get('/jobs', authOrg, async (req, res) => {
  try {
    const jobs = await Job.find({ organization: req.organization._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
});

// Get a specific job
router.get('/job/:id', authOrg, async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      organization: req.organization._id
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
});

// Update a job
router.put('/job/:id', authOrg, async (req, res) => {
  try {
    const { title, description, location, type, salary, tags, expiryDate, status } = req.body;
    
    const job = await Job.findOne({
      _id: req.params.id,
      organization: req.organization._id
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (type) job.type = type;
    if (salary) job.salary = salary;
    if (tags) job.tags = tags;
    if (expiryDate) job.expiryDate = expiryDate;
    if (status) job.status = status;
    
    job.updatedAt = Date.now();
    
    await job.save();
    
    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update job', error: error.message });
  }
});

// Delete a job
router.delete('/job/:id', authOrg, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      organization: req.organization._id
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Also delete all applications for this job
    await Application.deleteMany({ job: req.params.id });
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
});

// Get all applications for a specific job
router.get('/job/:id/applications', authOrg, async (req, res) => {
  try {
    // First verify the job belongs to this organization
    const job = await Job.findOne({
      _id: req.params.id,
      organization: req.organization._id
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Get applications for this job
    const applications = await Application.find({ job: req.params.id })
      .populate('user', 'name email')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
});

// Update application status (shortlist/reject)
router.put('/application/:id', authOrg, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'shortlisted', 'rejected', 'hired'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Verify the job belongs to this organization
    const job = await Job.findOne({
      _id: application.job,
      organization: req.organization._id
    });
    
    if (!job) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }
    
    application.status = status;
    application.updatedAt = Date.now();
    
    await application.save();
    
    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application status', error: error.message });
  }
});

// Get dashboard stats
router.get('/stats', authOrg, async (req, res) => {
  try {
    const activeJobs = await Job.countDocuments({ 
      organization: req.organization._id,
      status: 'active',
      expiryDate: { $gte: new Date() }
    });
    
    const totalApplications = await Application.countDocuments({
      job: { $in: await Job.find({ organization: req.organization._id }).distinct('_id') }
    });
    
    // For views, in a real app you would track this separately
    // This is just a placeholder
    const viewsToday = Math.floor(Math.random() * 200);
    
    res.json({
      activeJobs,
      applications: totalApplications,
      viewsToday
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

// Get recent activities
router.get('/activities', authOrg, async (req, res) => {
  try {
    // Get recent applications
    const recentApplications = await Application.find({
      job: { $in: await Job.find({ organization: req.organization._id }).distinct('_id') }
    })
    .populate('job', 'title')
    .populate('user', 'name')
    .sort({ appliedAt: -1 })
    .limit(5);
    
    // Format applications as activities
    const applicationActivities = recentApplications.map(app => ({
      id: app._id,
      type: 'application',
      title: 'New application received',
      description: `${app.user.name} applied for ${app.job.title} position`,
      time: formatTimeAgo(app.appliedAt)
    }));
    
    // Get recently expired jobs
    const expiredJobs = await Job.find({
      organization: req.organization._id,
      expiryDate: { $lt: new Date(), $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })
    .sort({ expiryDate: -1 })
    .limit(3);
    
    // Format expired jobs as activities
    const jobActivities = expiredJobs.map(job => ({
      id: job._id,
      type: 'job',
      title: 'Job posting expired',
      description: `${job.title} position has expired`,
      time: formatTimeAgo(job.expiryDate)
    }));
    
    // Combine and sort activities
    const activities = [...applicationActivities, ...jobActivities]
      .sort((a, b) => new Date(b.time) - new Date(a.time));
    
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error: error.message });
  }
});

// Helper function to format time ago
function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + ' year' + (interval === 1 ? '' : 's') + ' ago';
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + ' month' + (interval === 1 ? '' : 's') + ' ago';
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + ' day' + (interval === 1 ? '' : 's') + ' ago';
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' hour' + (interval === 1 ? '' : 's') + ' ago';
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' minute' + (interval === 1 ? '' : 's') + ' ago';
  }
  
  return Math.floor(seconds) + ' second' + (seconds === 1 ? '' : 's') + ' ago';
}

module.exports = router;