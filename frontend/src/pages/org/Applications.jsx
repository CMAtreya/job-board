import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSearch, FaChevronDown, FaChevronUp, FaEye, FaCheck, FaTimes, FaSort } from 'react-icons/fa';
import Layout from './components/Layout';
import '../../styles/org/applications.css';

const Applications = () => {
  // Mock data - in a real app, this would come from API
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      applicantName: 'John Smith',
      email: 'john.smith@example.com',
      appliedDate: '2023-06-20',
      status: 'pending',
      resumeUrl: '#',
      coverLetter: 'I am excited to apply for this position...'
    },
    {
      id: 2,
      jobTitle: 'Frontend Developer',
      applicantName: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      appliedDate: '2023-06-19',
      status: 'shortlisted',
      resumeUrl: '#',
      coverLetter: 'With my 5 years of experience in frontend development...'
    },
    {
      id: 3,
      jobTitle: 'UX Designer',
      applicantName: 'Michael Brown',
      email: 'michael.brown@example.com',
      appliedDate: '2023-06-18',
      status: 'rejected',
      resumeUrl: '#',
      coverLetter: 'I believe my design skills would be a great fit...'
    },
    {
      id: 4,
      jobTitle: 'Backend Developer',
      applicantName: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      appliedDate: '2023-06-17',
      status: 'pending',
      resumeUrl: '#',
      coverLetter: 'I am a backend developer with expertise in Node.js...'
    },
    {
      id: 5,
      jobTitle: 'Product Manager',
      applicantName: 'David Lee',
      email: 'david.lee@example.com',
      appliedDate: '2023-06-16',
      status: 'shortlisted',
      resumeUrl: '#',
      coverLetter: 'As a product manager with 7 years of experience...'
    }
  ]);

  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('appliedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Get unique job titles for filter
  const jobTitles = [...new Set(applications.map(app => app.jobTitle))];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle job filter change
  const handleJobFilterChange = (e) => {
    setJobFilter(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
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

  // View application details
  const viewApplication = (application) => {
    setSelectedApplication(application);
  };

  // Close application details modal
  const closeApplicationDetails = () => {
    setSelectedApplication(null);
  };

  // Update application status
  const updateApplicationStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    
    // If the application is currently selected, update its status in the modal too
    if (selectedApplication && selectedApplication.id === id) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  // Filter and sort applications
  const filteredApplications = applications
    .filter(app => {
      // Search term filter
      const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Job filter
      const matchesJob = jobFilter === 'all' || app.jobTitle === jobFilter;
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      
      return matchesSearch && matchesJob && matchesStatus;
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
      case 'pending':
        return 'status-badge pending';
      case 'shortlisted':
        return 'status-badge shortlisted';
      case 'rejected':
        return 'status-badge rejected';
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
      <div className="applications-container">
        <div className="applications-header">
          <h1>Applications</h1>
        </div>

        <div className="applications-controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by applicant name or email..."
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
              <label>Job Title:</label>
              <select value={jobFilter} onChange={handleJobFilterChange}>
                <option value="all">All Jobs</option>
                {jobTitles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Status:</label>
              <select value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        )}

        <div className="applications-table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th onClick={() => handleSortChange('applicantName')}>
                  Applicant {getSortIcon('applicantName')}
                </th>
                <th onClick={() => handleSortChange('jobTitle')}>
                  Job Title {getSortIcon('jobTitle')}
                </th>
                <th onClick={() => handleSortChange('email')}>
                  Email {getSortIcon('email')}
                </th>
                <th onClick={() => handleSortChange('appliedDate')}>
                  Applied Date {getSortIcon('appliedDate')}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map(application => (
                  <tr key={application.id}>
                    <td>{application.applicantName}</td>
                    <td>{application.jobTitle}</td>
                    <td>{application.email}</td>
                    <td>{formatDate(application.appliedDate)}</td>
                    <td>
                      <span className={getStatusBadgeClass(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-icon view" 
                          title="View Application"
                          onClick={() => viewApplication(application)}
                        >
                          <FaEye />
                        </button>
                        {application.status !== 'shortlisted' && (
                          <button 
                            className="action-icon shortlist" 
                            title="Shortlist"
                            onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                          >
                            <FaCheck />
                          </button>
                        )}
                        {application.status !== 'rejected' && (
                          <button 
                            className="action-icon reject" 
                            title="Reject"
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-applications-message">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="application-modal-overlay">
            <div className="application-modal">
              <div className="modal-header">
                <h2>Application Details</h2>
                <button className="close-modal" onClick={closeApplicationDetails}>&times;</button>
              </div>
              <div className="modal-content">
                <div className="applicant-info">
                  <h3>{selectedApplication.applicantName}</h3>
                  <p className="applicant-email">{selectedApplication.email}</p>
                  <p className="application-meta">
                    Applied for <strong>{selectedApplication.jobTitle}</strong> on {formatDate(selectedApplication.appliedDate)}
                  </p>
                  <div className="application-status">
                    <span className={getStatusBadgeClass(selectedApplication.status)}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="application-section">
                  <h4>Cover Letter</h4>
                  <div className="cover-letter">
                    <p>{selectedApplication.coverLetter}</p>
                  </div>
                </div>

                <div className="application-section">
                  <h4>Resume</h4>
                  <div className="resume-actions">
                    <a href={selectedApplication.resumeUrl} className="resume-link" target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                    <a href={selectedApplication.resumeUrl} className="resume-link" download>
                      Download Resume
                    </a>
                  </div>
                </div>

                <div className="application-actions">
                  {selectedApplication.status !== 'shortlisted' && (
                    <button 
                      className="action-button shortlist"
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'shortlisted')}
                    >
                      <FaCheck /> Shortlist Candidate
                    </button>
                  )}
                  {selectedApplication.status !== 'rejected' && (
                    <button 
                      className="action-button reject"
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                    >
                      <FaTimes /> Reject Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Applications;