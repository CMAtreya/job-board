import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBriefcase, FaPlus, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import '../../../styles/org/layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="org-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Job Portal</h2>
          <p>Organization Panel</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                <FaHome className="nav-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>
                <FaUser className="nav-icon" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/jobmangement" className={isActive('/jobmangement') ? 'active' : ''}>
                <FaBriefcase className="nav-icon" />
                <span>Jobs</span>
              </Link>
            </li>
            <li>
              <Link to="/createjob" className={isActive('/createjob') ? 'active' : ''}>
                <FaPlus className="nav-icon" />
                <span>Create Job</span>
              </Link>
            </li>
            <li>
              <Link to="/applications" className={isActive('/applications') ? 'active' : ''}>
                <FaChartBar className="nav-icon" />
                <span>Applications</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;