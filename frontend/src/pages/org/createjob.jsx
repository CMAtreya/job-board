import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTimes, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaTags } from 'react-icons/fa';
import Layout from './components/Layout';
import '../../styles/org/jobform.css';
import axios from 'axios';

const CreateJob = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    salary: '',
    skills: [],
    experience: '',
    expiryDate: '',
    status: 'active'
  });

  // State for form validation
  const [errors, setErrors] = useState({});
  
  // State for loading status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Job types options
  const jobTypes = [
    { value: 'Full-Time', label: 'Full-time' },
    { value: 'Part-Time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Internship', label: 'Internship' }
  ];
  
  // Experience level options
  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'executive', label: 'Executive Level' }
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Handle skills input (comma separated)
  const handleSkillsChange = (e) => {
    const skillsString = e.target.value;
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    
    setFormData({
      ...formData,
      skills: skillsArray
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = {};
    if (!formData.title.trim()) validationErrors.title = 'Job title is required';
    if (!formData.description.trim()) validationErrors.description = 'Job description is required';
    if (!formData.location.trim()) validationErrors.location = 'Job location is required';
    if (!formData.type) validationErrors.type = 'Employment type is required';
    if (!formData.experience) validationErrors.experience = 'Experience level is required';
    if (!formData.expiryDate) validationErrors.expiryDate = 'Expiry date is required';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Prepare data for API
      const jobData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        tags: formData.skills, // Backend expects tags instead of skills
        experience: formData.experience,
        expiryDate: formData.expiryDate,
        status: formData.status
      };
      
      // Print form data in console
      console.log('Form Data:', formData);
      console.log('Job Data being sent to API:', jobData);
      
      // Get token from localStorage and sessionStorage as fallback
      let token = localStorage.getItem('token');
      if (!token) {
        token = sessionStorage.getItem('token');
        console.log('Token retrieved from sessionStorage');
      }
      
      console.log('Authorization Token:', token ? 'Token exists' : 'No token found');
      
      if (!token) {
        alert('Authentication token not found. Please login again.');
        navigate('/login');
        return;
      }
      
      console.log('Sending request to:', 'http://localhost:5001/api/org/job');
      const response = await axios.post('http://localhost:5001/api/org/job', jobData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('API Response:', response);
      console.log('Job created successfully:', response.data);
      
      // Redirect to jobs management page after successful submission
      navigate('/jobmangement');
    } catch (error) {
      console.error('Error creating job:', error.response?.data || error.message);
      // Handle API errors
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Failed to create job. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="job-form-container">
        <div className="job-form-header">
          <button 
            className="back-button" 
            onClick={() => navigate('/jobmangement')}
          >
            <FaArrowLeft /> Back to Jobs
          </button>
          <h1>Create New Job</h1>
        </div>

        <form className="job-form" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
            <div className="section-title">
              <FaBriefcase className="section-icon" />
              <h2>Basic Information</h2>
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Job Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Frontend Developer"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Job Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                placeholder="Describe the job responsibilities, requirements, and benefits"
                className={errors.description ? 'error' : ''}
              ></textarea>
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">
                  <FaMapMarkerAlt className="input-icon" /> Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. New York, NY or Remote"
                  className={errors.location ? 'error' : ''}
                />
                {errors.location && <div className="error-message">{errors.location}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="type">Employment Type*</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={errors.type ? 'error' : ''}
                >
                  <option value="">Select employment type</option>
                  {jobTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.type && <div className="error-message">{errors.type}</div>}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="form-section">
            <div className="section-title">
              <FaTags className="section-icon" />
              <h2>Additional Details</h2>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="salary">Salary Range</label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g. $60,000 - $80,000 per year"
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Experience Level*</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={errors.experience ? 'error' : ''}
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
                {errors.experience && <div className="error-message">{errors.experience}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">
                <FaTags className="input-icon" /> Skills/Tags
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills.join(', ')}
                onChange={handleSkillsChange}
                placeholder="e.g. JavaScript, React, Node.js (comma separated)"
              />
              <small>Enter skills separated by commas</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">
                  <FaCalendarAlt className="input-icon" /> Expiry Date*
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.expiryDate ? 'error' : ''}
                />
                {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="status">Listing Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="button cancel-button"
              onClick={() => navigate('/jobmangement')}
              disabled={isSubmitting}
            >
              <FaTimes /> Cancel
            </button>
            <button 
              type="submit" 
              className="button submit-button"
              disabled={isSubmitting}
            >
              <FaSave /> {isSubmitting ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateJob;
