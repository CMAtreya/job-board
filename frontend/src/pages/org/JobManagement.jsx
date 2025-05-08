import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaSearch, FaSort, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Layout from './components/Layout';
import '../../styles/org/jobmanagement.css';

const JobManagement = () => {
  // Mock data - in a real app, this would come from API
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'active',
      applications: 12,
      views: 145,
      postedDate: '2023-06-15',
      expiryDate: '2023-07-15'
    },
    {
      id: 2,
      title: 'UX Designer',
      location: 'Remote',
      type: 'Contract',
      status: 'active',
      applications: 8,
      views: 98,
      postedDate: '2023-06-18',
      expiryDate: '2023-07-18'
    },
    {
      id: 3,
      title: 'Backend Developer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'active',
      applications: 15,
      views: 210,
      postedDate: '2023-06-10',
      expiryDate: '2023-07-10'
    },
    {
      id: 4,
      title: 'Product Manager',
      location: 'Chicago, IL',
      type: 'Full-time',
      status: 'active',
      applications: 20,
      views: 180,
      postedDate: '2023-06-05',
      expiryDate: '2023-07-05'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      location: 'Remote',
      type: 'Full-time',
      status: 'expired',
      applications: 6,
      views: 75,
      postedDate: '2023-05-15',
      expiryDate: '2023-06-15'
    }
  ]);

  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('postedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

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
          <Link to="/job/new" className="action-button primary">
            <FaPlus /> Post New Job
          </Link>
        </div>

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
              </select>
            </div>

            <div className="filter-group">
              <label>Job Type:</label>
              <select value={typeFilter} onChange={handleTypeFilterChange}>
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        )}

        <div className="job-table-container">
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
                        <Link to={`/job/${job.id}`} className="action-icon view" title="View Job">
                          <FaEye />
                        </Link>
                        <Link to={`/job/${job.id}/edit`} className="action-icon edit" title="Edit Job">
                          <FaEdit />
                        </Link>
                        <button className="action-icon delete" title="Delete Job">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-jobs-message">
                    No jobs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default JobManagement;