import { useState } from 'react';
import '../../styles/org/profile.css';
export default function CompanyProfile() {
  // Default company data using useState
  const [companyData, setCompanyData] = useState({
    name: 'Acme Corporation',
    email: 'contact@acmecorp.com',
    password: '••••••••••',
    logo: '/api/placeholder/120/120',
    description: 'Acme Corporation is a leading technology company specializing in innovative solutions for businesses. We are committed to developing cutting-edge products that transform the way organizations operate in the digital age.',
    website: 'https://www.acmecorp.com',
    location: 'San Francisco, CA',
    industry: 'Technology',
    size: '51-200',
    founded: '2015'
  });

  return (
    <div className="profile-container-full">
      <div className="profile-header">
        <h1>Organization Profile</h1>
        <div className="header-accent"></div>
      </div>
      
      <div className="profile-content-vertical">
        <div className="company-logo-section">
          <div className="logo-container">
            <img 
              src={companyData.logo} 
              alt={`${companyData.name} logo`}
              className="company-logo"
            />
          </div>
          <h2 className="company-name">{companyData.name}</h2>
          <p className="company-industry"><span className="industry-badge">{companyData.industry}</span></p>
        </div>

        <div className="section-container">
          <h3 className="section-title">Account Information</h3>
          <div className="info-item">
            <h4>Email</h4>
            <div className="info-row">
              <span className="icon">✉️</span>
              <p>{companyData.email}</p>
            </div>
          </div>
          
          <div className="info-item">
            <h4>Password</h4>
            <div className="info-row">
              <span className="icon">🔒</span>
              <p className="text-muted">{companyData.password}</p>
            </div>
          </div>
        </div>
        
        <div className="section-container">
          <h3 className="section-title">Company Description</h3>
          <p>{companyData.description}</p>
        </div>
        
        <div className="section-container">
          <h3 className="section-title">Company Details</h3>
          <div className="info-item">
            <h4>Website</h4>
            <div className="info-row">
              <span className="icon">🌐</span>
              <a href={companyData.website} className="website-link" target="_blank" rel="noopener noreferrer">
                {companyData.website.replace('https://', '')}
              </a>
            </div>
          </div>
          
          <div className="info-item">
            <h4>Location</h4>
            <div className="info-row">
              <span className="icon">📍</span>
              <p>{companyData.location}</p>
            </div>
          </div>
          
          <div className="info-item">
            <h4>Company Size</h4>
            <div className="info-row">
              <span className="icon">👥</span>
              <p>{companyData.size} employees</p>
            </div>
          </div>
          
          <div className="info-item">
            <h4>Founded</h4>
            <div className="info-row">
              <span className="icon">📅</span>
              <p>{companyData.founded}</p>
            </div>
          </div>
        </div>
        
        <div className="action-section">
          <div className="action-buttons">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}