import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch jobs data
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/job/org');
        setJobs(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load jobs. Please try again.');
        console.error('Error fetching jobs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await axios.delete(`/api/job/${jobId}`);
        // Remove the deleted job from the state
        setJobs(jobs.filter(job => job._id !== jobId));
        alert('Job deleted successfully!');
      } catch (err) {
        setError('Failed to delete job. Please try again.');
        console.error('Error deleting job:', err);
      }
    }
  };

  if (isLoading && jobs.length === 0) {
    return <div>Loading jobs...</div>;
  }

  return (
    <div>
      <div className="header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>My Jobs</h1>
        <Link to="/org/job/new" className="btn btn-primary">
          <i className="fas fa-plus"></i> Post New Job
        </Link>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {jobs.length === 0 ? (
        <div className="dashboard-card">
          <p>You haven't posted any jobs yet.</p>
          <Link to="/org/job/new" className="btn btn-primary">Post Your First Job</Link>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => {
                const isExpired = new Date(job.expiryDate) < new Date();
                const status = isExpired ? 'Expired' : 'Active';
                
                return (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{status}</td>
                    <td>
                      {job.expiryDate ? new Date(job.expiryDate).toLocaleDateString() : '—'}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/org/job/edit/${job._id}`} 
                          className="action-btn edit-btn"
                        >
                          Edit
                        </Link>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Jobs;