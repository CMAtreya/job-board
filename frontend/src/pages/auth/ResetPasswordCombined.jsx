import React, { useState, useEffect } from 'react';
import { FaLock, FaKey } from 'react-icons/fa';

// Combined CSS styles
const styles = `
.login-container { 
  flex: 1; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  background-color: #fff; 
  border-radius: 10px; 
  overflow: hidden; 
} 

.login-form-wrapper { 
  width: 100%; 
  max-width: 400px; 
  padding: 2rem; 
} 

.login-title { 
  font-size: 2.5rem; 
  color: #2a7a78; 
  margin-bottom: 2rem; 
  text-align: center; 
  font-weight: 600; 
} 

.form-group { 
  margin-bottom: 1.5rem; 
} 

label { 
  display: block; 
  margin-bottom: 0.5rem; 
  font-size: 1rem; 
  color: #333; 
  font-weight: 500; 
} 

.input-with-icon { 
  position: relative; 
} 

.input-icon { 
  position: absolute; 
  left: 12px; 
  top: 50%; 
  transform: translateY(-50%); 
  color: #2a7a78; 
  font-size: 1rem; 
} 

input { 
  width: 100%; 
  padding: 0.85rem 1rem 0.85rem 2.5rem; 
  border: 1px solid #e0e0e0; 
  border-radius: 6px; 
  font-size: 1rem; 
  transition: all 0.3s ease; 
  background-color: rgba(255, 255, 255, 0.9); 
} 

input:focus { 
  outline: none; 
  border-color: #2a7a78; 
  box-shadow: 0 0 0 3px rgba(42, 122, 120, 0.1); 
  background-color: #fff; 
} 

.sign-in-button { 
  width: 100%; 
  padding: 0.85rem; 
  background-color: #2a7a78; 
  color: white; 
  border: none; 
  border-radius: 6px; 
  font-size: 1rem; 
  font-weight: 500; 
  cursor: pointer; 
  transition: all 0.3s ease; 
  position: relative; 
  overflow: hidden; 
  margin-top: 1.5rem; 
  display: flex;
  align-items: center;
  justify-content: center;
} 

.sign-in-button:hover { 
  background-color: #236b69; 
  transform: translateY(-2px); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
} 

.sign-in-button:active { 
  transform: translateY(0); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
} 

.sign-in-button:disabled { 
  background-color: #b0b0b0; 
  cursor: not-allowed; 
  transform: none; 
  box-shadow: none; 
} 

.sign-in-button::after { 
  content: ''; 
  position: absolute; 
  top: 50%; 
  left: 50%; 
  width: 5px; 
  height: 5px; 
  background: rgba(255, 255, 255, 0.5); 
  opacity: 0; 
  border-radius: 100%; 
  transform: scale(1, 1) translate(-50%); 
  transform-origin: 50% 50%; 
} 

.sign-in-button:focus:not(:active)::after { 
  animation: ripple 1s ease-out; 
} 

@keyframes ripple { 
  0% { 
    transform: scale(0, 0); 
    opacity: 0.5; 
  } 
  20% { 
    transform: scale(25, 25); 
    opacity: 0.3; 
  } 
  100% { 
    opacity: 0; 
    transform: scale(40, 40); 
  } 
} 

.button-icon { 
  margin-right: 8px; 
} 

.error-message { 
  background-color: #ffebee; 
  color: #d32f2f; 
  padding: 10px; 
  border-radius: 4px; 
  margin-bottom: 15px; 
  font-size: 0.9rem; 
} 

.success-message { 
  background-color: #e8f5e9; 
  color: #2e7d32; 
  padding: 10px; 
  border-radius: 4px; 
  margin-bottom: 15px; 
  font-size: 0.9rem; 
} 

.signup-link { 
  margin-top: 1.5rem; 
  text-align: center; 
} 

.signup-link a { 
  color: #2a7a78; 
  text-decoration: none; 
  font-weight: 500; 
} 

.signup-link a:hover { 
  text-decoration: underline; 
} 

@media (max-width: 768px) { 
  .login-container { 
    border-radius: 0; 
  } 
  
  .login-form-wrapper { 
    padding: 1.5rem; 
  } 
}
`;

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // In a real app, you would extract the token from the URL
    // For example: const urlParams = new URLSearchParams(window.location.search);
    // const token = urlParams.get('token');
    
    // For demo purposes, we'll just use a dummy token
    setToken('dummy-token-12345');
  }, []);

  // Inject CSS
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setLoading(true);
    setSuccess(false);
    
    try {
      // Validate form inputs
      if (!password || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }
      
      // Password validation
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Password match validation
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Validate token
      if (!token) {
        throw new Error('Invalid or expired password reset link');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Password reset successful
      setSuccess(true);
      console.log('Password reset successful!');
      
      // In a real app, you would:
      // 1. Send password reset data to your backend
      // 2. Redirect to login page
      
      // For demo purposes, we'll just show a success message
      alert('Password reset successful! Redirecting to login page...');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    } catch (err) {
      setError(err.message);
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Reset Password</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Password reset successful!</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="sign-in-button"
            disabled={loading}
          >
            {loading ? (
              'Resetting...'
            ) : (
              <>
                <FaKey className="button-icon" /> Reset Password
              </>
            )}
          </button>
        </form>
        
        <div className="signup-link">
          <p>Remember your password? <a href="/">Sign in</a></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;