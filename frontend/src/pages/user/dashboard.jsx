import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user/dashboard.css';

export default function Dashboard() {
  // Mock data - in a real app, this would come from API/backend
  const userData = {
    name: "John Doe",
    profileCompletion: 65,
    appliedJobs: 12,
    savedJobs: 8,
    recommendedJobs: [
      { id: 1, title: "Frontend Developer", company: "Tech Solutions Inc.", location: "Remote", salary: "$80,000 - $100,000" },
      { id: 2, title: "UX Designer", company: "Creative Minds", location: "New York, NY", salary: "$75,000 - $95,000" },
      { id: 3, title: "Full Stack Developer", company: "Innovative Apps", location: "San Francisco, CA", salary: "$90,000 - $120,000" },
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>User Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/profile" className="nav-item">
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </Link>
          <a href="#" className="nav-item">
            <i className="fas fa-bookmark"></i>
            <span>Saved Jobs</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-briefcase"></i>
            <span>Applied Jobs</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-search"></i>
            <span>Browse Jobs</span>
          </a>
        </nav>
      </div>
      <div className="main-content">
        <div className="welcome-section">
          <h1>Welcome back, {userData.name}!</h1>
          <p>Here's what's happening with your job search today.</p>
        </div>
        
        <div className="profile-completion-section">
          <h2>Profile Completion</h2>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${userData.profileCompletion}%` }}></div>
          </div>
          <p>{userData.profileCompletion}% complete</p>
          <Link to="/profile"><button className="btn-complete-profile">Complete Your Profile</button></Link>
        </div>
        
        <div className="stats-container">
          <div className="stat-card">
            <i className="fas fa-briefcase"></i>
            <h3>Applied Jobs</h3>
            <p className="stat-number">{userData.appliedJobs}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-bookmark"></i>
            <h3>Saved Jobs</h3>
            <p className="stat-number">{userData.savedJobs}</p>
          </div>
        </div>
        
        <div className="recommended-jobs-section">
          <h2>Recommended Jobs</h2>
          <div className="jobs-container">
            {userData.recommendedJobs.map(job => (
              <div className="job-card" key={job.id}>
                <h3>{job.title}</h3>
                <p className="company-name">{job.company}</p>
                <div className="job-details">
                  <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                  <span><i className="fas fa-money-bill-wave"></i> {job.salary}</span>
                </div>
                <div className="job-actions">
                  <button className="btn-apply">Apply Now</button>
                  <button className="btn-save"><i className="far fa-bookmark"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
