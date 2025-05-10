import { useState } from 'react';
import '../../styles/org/register.css';
import axios from 'axios';

const Register = () => {
  // State for form data
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    logo: null,
    description: '',
    websiteUrl: '',
    location: '',
    industryType: '',
    companySize: '',
    foundedYear: ''
  });

  // State for form errors
  const [errors, setErrors] = useState({});
  
  // State for logo preview
  const [logoPreview, setLogoPreview] = useState(null);

  // Company size options
  const companySizeOptions = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ];

  // Industry types
  const industryTypes = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Transportation',
    'Entertainment',
    'Construction',
    'Food & Beverage',
    'Other'
  ];

  // Generate year options for founded year (from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file
      });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setFormData({
      ...formData,
      logo: null
    });
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate company name
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Set loading state if needed
        // setIsSubmitting(true);
        
        // Prepare data for API
        const registrationData = {
          name: formData.companyName,
          email: formData.email,
          password: formData.password,
          logo: formData.logo ? formData.logo : null,
          description: formData.description,
          website: formData.websiteUrl, // Map websiteUrl to website
          location: formData.location,
          industry: formData.industryType, // Map industryType to industry
          size: formData.companySize, // Map companySize to size
          foundedYear: formData.foundedYear ? parseInt(formData.foundedYear) : null
        };
        
        console.log('Sending registration data:', registrationData);
        
        // Send registration request to backend
        const response = await axios.post('http://localhost:5001/api/org/register', registrationData);
        
        console.log('Registration successful:', response.data);
        
        // Store token in localStorage and sessionStorage is no longer needed here
        // since we're redirecting to login page instead of dashboard
        
        // Show success message
        alert('Registration successful! Please login with your credentials.');
        
        // Redirect to login page instead of dashboard
        window.location.href = '/';
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        
        // Handle API errors - you might want to show these to the user
        alert(`Registration failed: ${error.response?.data?.message || 'Please try again later'}`);
      } finally {
        // Reset loading state if needed
        // setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h1>Organization Registration</h1>
        <p className="form-description">Create your organization profile to get started</p>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="companyName">Company Name <span className="required">*</span></label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={errors.companyName ? 'error' : ''}
              />
              {errors.companyName && <span className="error-message">{errors.companyName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password <span className="required">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password ? <span className="error-message">{errors.password}</span> : 
                <small>Password must be at least 8 characters long</small>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
          
          <div className="form-section">
            <h2>Company Details</h2>
            
            <div className="form-group logo-upload">
              <label>Company Logo</label>
              <div className="logo-container">
                {logoPreview ? (
                  <div className="logo-preview">
                    <img src={logoPreview} alt="Company logo preview" />
                    <button type="button" className="remove-logo" onClick={handleRemoveLogo}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="logo-upload-box">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo" className="upload-label">
                      <span className="upload-icon">+</span>
                      <span>Upload Logo</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Company Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your company..."
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="industryType">Industry Type</label>
              <select
                id="industryType"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
              >
                <option value="">Select Industry</option>
                {industryTypes.map((industry, index) => (
                  <option key={index} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="companySize">Company Size</label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
              >
                <option value="">Select Company Size</option>
                {companySizeOptions.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="foundedYear">Founded Year</label>
              <select
                id="foundedYear"
                name="foundedYear"
                value={formData.foundedYear}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="register-button">Register Organization</button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Already have an account? <a href="/login" style={{ color: '#00897b', fontWeight: '500' }}>Sign in here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;