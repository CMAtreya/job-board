import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTimes, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaTags } from 'react-icons/fa';
import Layout from './components/Layout';
import '../../styles/org/jobform.css';

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
  
  // Job types options
  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
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
  const handleSubmit = (e) => {
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
    
    // Submit form data
    console.log('Submitting job data:', formData);
    
    // Redirect to jobs management page after successful submission
    navigate('/org/jobs');
  };



  return (
    <Layout>
      <div className="job-form-container">
        <div className="job-form-header">
          <button 
            className="back-button" 
            onClick={() => navigate('/org/jobs')}
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
              onClick={() => navigate('/org/jobs')}
            >
              <FaTimes /> Cancel
            </button>
            <button type="submit" className="button submit-button">
              <FaSave /> Save Job
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateJob;
