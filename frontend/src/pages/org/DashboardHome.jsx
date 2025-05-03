import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    activeJobs: 12,
    applications: 48,
    viewsToday: 156
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'application', title: 'New application received', description: 'John Doe applied for Senior Developer position', time: '2 hours ago' },
    { id: 2, type: 'job', title: 'Job posting expired', description: 'UI/UX Designer position has expired', time: '1 day ago' },
    { id: 3, type: 'profile', title: 'Profile updated', description: 'Company information was updated', time: '2 days ago' },
    { id: 4, type: 'application', title: 'Application status changed', description: 'Sarah Smith was shortlisted for Marketing Manager', time: '3 days ago' }
  ]);

  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Simulating API call
    // const fetchDashboardData = async () => {
    //   try {
    //     const statsResponse = await axios.get('/api/org/stats');
    //     setStats(statsResponse.data);
    //     
    //     const activitiesResponse = await axios.get('/api/org/activities');
    //     setRecentActivities(activitiesResponse.data);
    //   } catch (err) {
    //     console.error('Error fetching dashboard data:', err);
    //   }
    // };
    // 
    // fetchDashboardData();
  }, []);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'application': return 'fas fa-user';
      case 'job': return 'fas fa-briefcase';
      case 'profile': return 'fas fa-building';
      default: return 'fas fa-bell';
    }
  };

  return (
    <div>
      <h1>Company Dashboard</h1>
      
      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-briefcase"></i>
          </div>
          <div className="stat-info">
            <h4>{stats.activeJobs}</h4>
            <p>Active Jobs</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="stat-info">
            <h4>{stats.applications}</h4>
            <p>Total Applications</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-eye"></i>
          </div>
          <div className="stat-info">
            <h4>{stats.viewsToday}</h4>
            <p>Views Today</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {recentActivities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">
              <i className={getActivityIcon(activity.type)}></i>
            </div>
            <div className="activity-content">
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
            </div>
            <div className="activity-time">
              {activity.time}
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions Cards */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>
            <div className="card-icon">
              <i className="fas fa-building"></i>
            </div>
            Company Profile
          </h3>
          <p>View or edit your company information</p>
          <div className="card-content">
            <Link to="/org/profile" className="btn btn-primary">Edit Profile</Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>
            <div className="card-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            Post Jobs
          </h3>
          <p>Create a new job listing.</p>
          <div className="card-content">
            <Link to="/org/job/new" className="btn btn-primary">New Job</Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>
            <div className="card-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            My Jobs
          </h3>
          <p>Manage your current job listings.</p>
          <div className="card-content">
            <Link to="/org/jobs" className="btn btn-primary">View Jobs</Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>
            <div className="card-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            View Applications
          </h3>
          <p>See applicants for your job postings</p>
          <div className="card-content">
            <Link to="/org/applications" className="btn btn-primary">View Applications</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;