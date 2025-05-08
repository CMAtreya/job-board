import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaFileAlt, FaCheckCircle, FaTimesCircle, FaUserCheck } from 'react-icons/fa';
import Layout from './components/Layout';
import '../../styles/org/applications.css';

const JobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  // State for job details
  const [job, setJob] = useState(null);
  
  // State for applicants
  const [applicants, setApplicants] = useState([]);
  
  // State for selected applicant
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  
  // Mock data - in a real app, this would come from API
  useEffect(() => {
    // Fetch job details
    const mockJob = {
      id: parseInt(jobId),
      title: 'Frontend Developer',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'active',
      applications: 12,
      views: 145,
      postedDate: '2023-06-15',
      expiryDate: '2023-07-15'
    };
    
    // Fetch applicants
    const mockApplicants = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567',
        appliedDate: '2023-06-18',
        status: 'pending',
        resumeUrl: '#',
        coverLetterUrl: '#',
        experience: '5 years',
        skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'],
        education: 'Bachelor of Science in Computer Science',
        profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 2,
        name: 'Emily Johnson',
        email: 'emily.johnson@example.com',
        phone: '+1 (555) 987-6543',
        appliedDate: '2023-06-20',
        status: 'shortlisted',
        resumeUrl: '#',
        coverLetterUrl: '#',
        experience: '3 years',
        skills: ['JavaScript', 'Vue.js', 'SASS', 'HTML', 'Express'],
        education: 'Master of Computer Science',
        profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+1 (555) 456-7890',
        appliedDate: '2023-06-22',
        status: 'rejected',
        resumeUrl: '#',
        coverLetterUrl: '#',
        experience: '2 years',
        skills: ['JavaScript', 'Angular', 'CSS', 'HTML', 'Firebase'],
        education: 'Bachelor of Engineering in Software',
        profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '+1 (555) 789-0123',
        appliedDate: '2023-06-25',
        status: 'pending',
        resumeUrl: '#',
        coverLetterUrl: '#',
        experience: '4 years',
        skills: ['JavaScript', 'React', 'Redux', 'TypeScript', 'GraphQL'],
        education: 'Master of Information Technology',
        profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg'
      },
      {
        id: 5,
        name: 'David Lee',
        email: 'david.lee@example.com',
        phone: '+1 (555) 234-5678',
        appliedDate: '2023-06-28',
        status: 'shortlisted',
        resumeUrl: '#',
        coverLetterUrl: '#',
        experience: '6 years',
        skills: ['JavaScript', 'React Native', 'CSS', 'HTML', 'AWS'],
        education: 'Bachelor of Science in Software Engineering',
        profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg'
      }
    ];
    
    setJob(mockJob);
    setApplicants(mockApplicants);
  }, [jobId]);
  
  // Function to view applicant details
  const viewApplicantDetails = (applicant) => {
    setSelectedApplicant(applicant);
  };
  
  // Function to close applicant details
  const closeApplicantDetails = () => {
    setSelectedApplicant(null);
  };
  
  // Function to update applicant status
  const updateApplicantStatus = (applicantId, newStatus) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === applicantId 
        ? { ...applicant, status: newStatus } 
        : applicant
    ));
    
    if (selectedApplicant && selectedApplicant.id === applicantId) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };
  
  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'shortlisted':
        return 'status-badge shortlisted';
      case 'rejected':
        return 'status-badge rejected';
      case 'pending':
      default:
        return 'status-badge pending';
    }
  };
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (!job) {
    return (
      <Layout>
        <div className="loading-container">
          <p>Loading job details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="applicants-container">
        <div className="applicants-header">
          <button 
            className="back-button" 
            onClick={() => navigate('/jobmangement')}
          >
            <FaArrowLeft /> Back to Jobs
          </button>
          <h1>Applicants for {job.title}</h1>
          <div className="job-meta">
            <span className="job-location">{job.location}</span>
            <span className="job-type">{job.type}</span>
            <span className="applicant-count">{applicants.length} Applicants</span>
          </div>
        </div>

        <div className="applicants-content">
          <div className="applicants-list">
            {applicants.length === 0 ? (
              <div className="no-applicants-message">
                <p>No applicants found for this job.</p>
              </div>
            ) : (
              <div className="applicant-cards">
                {applicants.map(applicant => (
                  <div 
                    key={applicant.id} 
                    className={`applicant-card ${selectedApplicant && selectedApplicant.id === applicant.id ? 'selected' : ''}`}
                    onClick={() => viewApplicantDetails(applicant)}
                  >
                    <div className="applicant-card-header">
                      <img 
                        src={applicant.profilePicture} 
                        alt={applicant.name} 
                        className="applicant-avatar"
                      />
                      <div className="applicant-card-info">
                        <h3>{applicant.name}</h3>
                        <p className="applicant-email">{applicant.email}</p>
                        <span className={getStatusBadgeClass(applicant.status)}>
                          {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="applicant-card-body">
                      <div className="applicant-detail">
                        <strong>Applied:</strong> {formatDate(applicant.appliedDate)}
                      </div>
                      <div className="applicant-detail">
                        <strong>Experience:</strong> {applicant.experience}
                      </div>
                      <div className="applicant-skills">
                        {applicant.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                        {applicant.skills.length > 3 && (
                          <span className="more-skills">+{applicant.skills.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedApplicant && (
            <div className="applicant-details-panel">
              <div className="panel-header">
                <h2>Applicant Details</h2>
                <button className="close-button" onClick={closeApplicantDetails}>
                  <FaTimesCircle />
                </button>
              </div>
              
              <div className="panel-content">
                <div className="applicant-profile">
                  <img 
                    src={selectedApplicant.profilePicture} 
                    alt={selectedApplicant.name} 
                    className="applicant-profile-picture"
                  />
                  <div className="applicant-info">
                    <h3>{selectedApplicant.name}</h3>
                    <p className="applicant-email">
                      <FaEnvelope /> {selectedApplicant.email}
                    </p>
                    <p className="applicant-phone">
                      <FaPhone /> {selectedApplicant.phone}
                    </p>
                  </div>
                </div>
                
                <div className="applicant-status-section">
                  <h4>Application Status</h4>
                  <div className="status-controls">
                    <button 
                      className={`status-btn ${selectedApplicant.status === 'pending' ? 'active' : ''}`}
                      onClick={() => updateApplicantStatus(selectedApplicant.id, 'pending')}
                    >
                      Pending
                    </button>
                    <button 
                      className={`status-btn ${selectedApplicant.status === 'shortlisted' ? 'active' : ''}`}
                      onClick={() => updateApplicantStatus(selectedApplicant.id, 'shortlisted')}
                    >
                      <FaUserCheck /> Shortlist
                    </button>
                    <button 
                      className={`status-btn ${selectedApplicant.status === 'rejected' ? 'active' : ''}`}
                      onClick={() => updateApplicantStatus(selectedApplicant.id, 'rejected')}
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                </div>
                
                <div className="applicant-section">
                  <h4>Skills</h4>
                  <div className="skills-list">
                    {selectedApplicant.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="applicant-section">
                  <h4>Experience</h4>
                  <p>{selectedApplicant.experience}</p>
                </div>
                
                <div className="applicant-section">
                  <h4>Education</h4>
                  <p>{selectedApplicant.education}</p>
                </div>
                
                <div className="applicant-section">
                  <h4>Documents</h4>
                  <div className="document-links">
                    <a href={selectedApplicant.resumeUrl} className="document-link">
                      <FaFileAlt /> Resume
                    </a>
                    <a href={selectedApplicant.coverLetterUrl} className="document-link">
                      <FaFileAlt /> Cover Letter
                    </a>
                  </div>
                </div>
                
                <div className="applicant-section">
                  <h4>Applied on</h4>
                  <p>{formatDate(selectedApplicant.appliedDate)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobApplicants;