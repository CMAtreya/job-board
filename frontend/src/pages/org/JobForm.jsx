import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/org/jobform.css';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-Time',
    salary: '',
    tags: '',
    expiryDate: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If in edit mode, fetch the job data
    if (isEditMode) {
      const fetchJob = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`/api/job/${id}`);
          const job = response.data;
          
          // Format the expiry date for the date input
          let formattedExpiryDate = '';
          if (job.expiryDate) {
            const date = new Date(job.expiryDate);
            formattedExpiryDate = date.toISOString().split('T')[0];
          }
          
          setFormData({
            title: job.title || '',
            description: job.description || '',
            location: job.location || '',
            type: job.type || 'Full-Time',
            salary: job.salary || '',
            tags: job.tags ? job.tags.join(', ') : '',
            expiryDate: formattedExpiryDate
          });
          
          setError(null);
        } catch (err) {
          setError('Failed to load job data. Please try again.');
          console.error('Error fetching job:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchJob();
    } else {
      // Set default expiry date to 30 days from now for new jobs
      const defaultExpiryDate = new Date();
      defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 30);
      
      setFormData(prev => ({
        ...prev,
        expiryDate: defaultExpiryDate.toISOString().split('T')[0]
      }));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Process tags from comma-separated string to array
      const processedData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      if (isEditMode) {
        // Update existing job
        await axios.put(`/api/job/${id}`, processedData);
        alert('Job updated successfully!');
      } else {
        // Create new job
        await axios.post('/api/job', processedData);
        alert('Job posted successfully!');
      }
      
      // Redirect to jobs list
      navigate('/org/jobs');
    } catch (err) {
      setError('Failed to save job. Please try again.');
      console.error('Error saving job:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode && !formData.title) {
    return <div>Loading job data...</div>;
  }

  return (
    <div>
      <h1>{isEditMode ? 'Edit Job' : 'Post New Job'}</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="dashboard-card">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
              placeholder="Describe the job responsibilities, requirements, and benefits"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g. New York, NY or Remote"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Job Type</label>
            <select
              id="type"
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="salary">Salary Range</label>
            <input
              type="text"
              id="salary"
              name="salary"
              className="form-control"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $50,000 - $70,000 or $25/hour"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="form-control"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. React, JavaScript, Remote"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              className="form-control"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={() => navigate('/org/jobs')}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (isEditMode ? 'Update Job' : 'Post Job')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;