import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(jobId || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all jobs first
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/job/org');
        setJobs(response.data);
        
        // If no jobId is provided in URL and we have jobs, select the first one
        if (!selectedJobId && response.data.length > 0) {
          setSelectedJobId(response.data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
      }
    };

    fetchJobs();
  }, [selectedJobId]);

  useEffect(() => {
    // Fetch applications for the selected job
    const fetchApplications = async () => {
      if (!selectedJobId) return;
      
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/application/org/${selectedJobId}`);
        setApplications(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [selectedJobId]);

  const handleJobChange = (e) => {
    setSelectedJobId(e.target.value);
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.post(`/api/application/${applicationId}/status`, { status: newStatus });
      
      // Update the application status in the state
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
      
      alert(`Application ${newStatus === 'shortlisted' ? 'shortlisted' : 'rejected'} successfully!`);
    } catch (err) {
      console.error('Error updating application status:', err);
      alert('Failed to update application status. Please try again.');
    }
  };

  return (
    <div>
      <h1>Applications</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {jobs.length === 0 ? (
        <div className="dashboard-card">
          <p>You haven't posted any jobs yet.</p>
          <Link to="/org/job/new" className="btn btn-primary">Post Your First Job</Link>
        </div>
      ) : (
        <div>
          <div className="form-group" style={{ maxWidth: '400px', marginBottom: '20px' }}>
            <label htmlFor="jobSelect">Select Job</label>
            <select
              id="jobSelect"
              className="form-control"
              value={selectedJobId}
              onChange={handleJobChange}
            >
              <option value="">-- Select a job --</option>
              {jobs.map(job => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
          
          {selectedJobId ? (
            isLoading ? (
              <div>Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="dashboard-card">
                <p>No applications received for this job yet.</p>
              </div>
            ) : (
              <div>
                <h2>
                  {applications.length} Application{applications.length !== 1 ? 's' : ''} for {jobs.find(job => job._id === selectedJobId)?.title}
                </h2>
                
                {applications.map(application => (
                  <div key={application._id} className="application-card">
                    <div className="applicant-info">
                      <h3>{application.name}</h3>
                      <p>{application.email}</p>
                      {application.resume && (
                        <p>
                          <a href={application.resume} target="_blank" rel="noopener noreferrer">
                            View Resume
                          </a>
                        </p>
                      )}
                    </div>
                    
                    <div className="application-actions">
                      {application.status === 'pending' ? (
                        <>
                          <button 
                            className="shortlist-btn"
                            onClick={() => handleStatusChange(application._id, 'shortlisted')}
                          >
                            Shortlist
                          </button>
                          <button 
                            className="reject-btn"
                            onClick={() => handleStatusChange(application._id, 'rejected')}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`status-badge ${application.status}`}>
                          {application.status === 'shortlisted' ? 'Shortlisted' : 'Rejected'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="dashboard-card">
              <p>Please select a job to view applications.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;