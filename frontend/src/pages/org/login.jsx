import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/org/register.css'; // Reusing the register styles

const Login = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for form errors
  const [errors, setErrors] = useState({});
  
  // State for loading status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for login error
  const [loginError, setLoginError] = useState('');

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
    
    // Clear login error when user types
    if (loginError) {
      setLoginError('');
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        setLoginError('');
        
        console.log('Attempting login with:', { email: formData.email });
        
        // Send login request to backend
        const response = await axios.post('http://localhost:5001/api/org/login', {
          email: formData.email,
          password: formData.password
        });
        
        console.log('Login response:', response.data);
        
        // Store token in both localStorage and sessionStorage for redundancy
        const { token } = response.data;
        localStorage.setItem('token', token);
        sessionStorage.setItem('token', token);
        
        console.log('Login successful, redirecting to dashboard');
        
        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        
        // Handle API errors
        if (error.response?.data?.message) {
          setLoginError(error.response.data.message);
        } else {
          setLoginError('Login failed. Please check your credentials and try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper" style={{ maxWidth: '500px' }}>
        <h1>Organization Login</h1>
        <p className="form-description">Sign in to your organization account</p>
        
        {loginError && (
          <div className="error-alert" style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
          </div>
          
          // Fix the form-actions class to position the sign-in button correctly
          <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              className="register-button"
              disabled={isSubmitting}
              style={{ width: 'auto', minWidth: '120px' }}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Don't have an account? <Link to="/register" style={{ color: '#00897b', fontWeight: '500' }}>Register here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;