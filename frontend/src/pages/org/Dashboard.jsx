import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaEye, FaBell, FaPlus, FaUserEdit, FaListAlt } from 'react-icons/fa';
import Layout from './components/Layout';
import '../../styles/org/dashboard.css';

const Dashboard = () => {
  // Mock data - in a real app, this would come from API
  const [stats, setStats] = useState({
    activeJobs: 12,
    totalApplications: 48,
    profileViews: 156,
    jobViews: 892
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'application',
      message: 'New application received for Frontend Developer',
      time: '2 hours ago',
      job: 'Frontend Developer'
    },
    {
      id: 2,
      type: 'view',
      message: 'Someone viewed your UX Designer job posting',
      time: '5 hours ago',
      job: 'UX Designer'
    },
    {
      id: 3,
      type: 'application',
      message: 'New application received for Backend Developer',
      time: '1 day ago',
      job: 'Backend Developer'
    },
    {
      id: 4,
      type: 'profile',
      message: 'Your company profile was viewed 24 times yesterday',
      time: '1 day ago'
    },
    {
      id: 5,
      type: 'application',
      message: 'New application received for Product Manager',
      time: '2 days ago',
      job: 'Product Manager'
    }
  ]);

  // Function to get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return <FaUsers className="activity-icon application" />;
      case 'view':
        return <FaEye className="activity-icon view" />;
      case 'profile':
        return <FaUserEdit className="activity-icon profile" />;
      default:
        return <FaBell className="activity-icon" />;
    }
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="quick-actions">
            <Link to="/job/new" className="action-button primary">
              <FaPlus /> Post New Job
            </Link>
            <Link to="/profile" className="action-button secondary">
              <FaUserEdit /> Edit Profile
            </Link>
            <Link to="/applications" className="action-button secondary">
              <FaListAlt /> View Applications
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon jobs">
              <FaBriefcase />
            </div>
            <div className="stat-details">
              <h3>{stats.activeJobs}</h3>
              <p>Active Jobs</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon applications">
              <FaUsers />
            </div>
            <div className="stat-details">
              <h3>{stats.totalApplications}</h3>
              <p>Total Applications</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon profile-views">
              <FaEye />
            </div>
            <div className="stat-details">
              <h3>{stats.profileViews}</h3>
              <p>Profile Views</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon job-views">
              <FaEye />
            </div>
            <div className="stat-details">
              <h3>{stats.jobViews}</h3>
              <p>Job Listing Views</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <Link to="/notifications" className="view-all">View All</Link>
          </div>
          
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                {getActivityIcon(activity.type)}
                <div className="activity-content">
                  <p className="activity-message">{activity.message}</p>
                  <div className="activity-meta">
                    <span className="activity-time">{activity.time}</span>
                    {activity.job && (
                      <Link to={`/jobs?search=${activity.job}`} className="activity-link">
                        View Job
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Overview */}
        <div className="jobs-overview">
          <div className="section-header">
            <h2>Job Postings Overview</h2>
            <Link to="/jobs" className="view-all">Manage Jobs</Link>
          </div>
          
          <div className="overview-cards">
            <div className="overview-card">
              <h3>Active Jobs</h3>
              <div className="overview-value">{stats.activeJobs}</div>
              <Link to="/jobs?status=active" className="overview-link">View Active Jobs</Link>
            </div>
            
            <div className="overview-card">
              <h3>Applications Pending Review</h3>
              <div className="overview-value">{Math.floor(stats.totalApplications * 0.4)}</div>
              <Link to="/applications?status=pending" className="overview-link">Review Applications</Link>
            </div>
            
            <div className="overview-card">
              <h3>Jobs Expiring Soon</h3>
              <div className="overview-value">3</div>
              <Link to="/jobs?expiring=soon" className="overview-link">Extend Deadlines</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
