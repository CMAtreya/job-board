import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../styles/org/dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch(tab) {
      case 'dashboard':
        navigate('/org/dashboard');
        break;
      case 'profile':
        navigate('/org/profile');
        break;
      case 'jobs':
        navigate('/org/jobs');
        break;
      case 'applications':
        navigate('/org/applications');
        break;
      case 'settings':
        navigate('/org/settings');
        break;
      default:
        navigate('/org/dashboard');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="window-controls">
            <span className="control"></span>
            <span className="control"></span>
            <span className="control"></span>
          </div>
          <h2>Company Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''}>
            <button onClick={() => handleTabClick('dashboard')}>
              <i className="fas fa-home"></i>
              Dashboard
            </button>
          </li>
          <li className={activeTab === 'profile' ? 'active' : ''}>
            <button onClick={() => handleTabClick('profile')}>
              <i className="fas fa-user"></i>
              Profile
            </button>
          </li>
          <li className={activeTab === 'jobs' ? 'active' : ''}>
            <button onClick={() => handleTabClick('jobs')}>
              <i className="fas fa-briefcase"></i>
              Jobs
            </button>
          </li>
          <li className={activeTab === 'applications' ? 'active' : ''}>
            <button onClick={() => handleTabClick('applications')}>
              <i className="fas fa-file-alt"></i>
              Applications
            </button>
          </li>
          <li className={activeTab === 'settings' ? 'active' : ''}>
            <button onClick={() => handleTabClick('settings')}>
              <i className="fas fa-cog"></i>
              Settings
            </button>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;