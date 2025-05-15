import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaSearch, FaSort, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Layout from './components/Layout';
import '../../styles/org/jobmanagement.css';
import axios from 'axios';

const JobManagement = () => {
  // State for jobs data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('postedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/org/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Transform data if needed to match our component's expected format
        const formattedJobs = response.data.map(job => ({
          id: job._id,
          title: job.title,
          location: job.location,
          type: job.type,
          status: job.status || 'active',
          applications: job.applications?.length || 0,
          views: job.views || 0,
          postedDate: job.createdAt,
          expiryDate: job.expiryDate
        }));
        
        setJobs(formattedJobs);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle type filter change
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle job deletion
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/org/job/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Remove job from state
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (err) {
        console.error('Error deleting job:', err);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter(job => {
      // Search term filter
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      
      // Type filter
      const matchesType = typeFilter === 'all' || job.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-badge active';
      case 'expired':
        return 'status-badge expired';
      case 'draft':
        return 'status-badge draft';
      case 'closed':
        return 'status-badge expired';
      default:
        return 'status-badge';
    }
  };

  // Function to get sort icon
  const getSortIcon = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />;
    }
    return null;
  };

  return (
    <Layout>
      <div className="job-management-container">
        <div className="job-management-header">
          <h1>Job Management</h1>
          <Link to="/createjob" className="action-button primary">
            <FaPlus /> Post New Job
          </Link>
        </div>

        {error && (
          <div className="error-message" style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <div className="job-management-controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs by title or location..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <button className="filter-toggle" onClick={toggleFilters}>
            <FaFilter /> Filters {showFilters ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label>Status:</label>
              <select value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Job Type:</label>
              <select value={typeFilter} onChange={handleTypeFilterChange}>
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>
        )}

        <div className="job-table-container">
          {loading ? (
            <div className="loading-message" style={{ padding: '2rem', textAlign: 'center' }}>
              Loading jobs...
            </div>
          ) : (
            <table className="job-table">
              <thead>
                <tr>
                  <th onClick={() => handleSortChange('title')}>
                    Job Title {getSortIcon('title')}
                  </th>
                  <th onClick={() => handleSortChange('location')}>
                    Location {getSortIcon('location')}
                  </th>
                  <th onClick={() => handleSortChange('type')}>
                    Type {getSortIcon('type')}
                  </th>
                  <th onClick={() => handleSortChange('applications')}>
                    Applications {getSortIcon('applications')}
                  </th>
                  <th onClick={() => handleSortChange('views')}>
                    Views {getSortIcon('views')}
                  </th>
                  <th onClick={() => handleSortChange('postedDate')}>
                    Posted Date {getSortIcon('postedDate')}
                  </th>
                  <th onClick={() => handleSortChange('expiryDate')}>
                    Expiry Date {getSortIcon('expiryDate')}
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.location}</td>
                      <td>{job.type}</td>
                      <td>{job.applications}</td>
                      <td>{job.views}</td>
                      <td>{formatDate(job.postedDate)}</td>
                      <td>{formatDate(job.expiryDate)}</td>
                      <td>
                        <span className={getStatusBadgeClass(job.status)}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/job-applicants/${job.id}`} className="action-icon view" title="View Applicants">
                            <FaEye />
                          </Link>
                          <Link to={`/editjob/${job.id}`} className="action-icon edit" title="Edit Job">
                            <FaEdit />
                          </Link>
                          <button 
                            className="action-icon delete" 
                            title="Delete Job"
                            onClick={() => handleDeleteJob(job.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-jobs-message">
                      {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' 
                        ? 'No jobs found matching your criteria.'
                        : 'No jobs found. Click "Post New Job" to create your first job listing.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobManagement;