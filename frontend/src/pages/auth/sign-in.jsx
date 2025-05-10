import React, { useState, useEffect } from 'react';
import '../../styles/auth/sign-in.css';
import { Link } from 'react-router-dom';

// Icons (from react-icons)
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

// JobBoardHero component
const JobBoardHero = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const fullText1 = "Find your";
  const fullText2 = "dream job";

  useEffect(() => {
    let currentIndex1 = 0;
    const typingInterval1 = setInterval(() => {
      if (currentIndex1 < fullText1.length) {
        setText1(fullText1.substring(0, currentIndex1 + 1));
        currentIndex1++;
      } else {
        clearInterval(typingInterval1);
        let currentIndex2 = 0;
        const typingInterval2 = setInterval(() => {
          if (currentIndex2 < fullText2.length) {
            setText2(fullText2.substring(0, currentIndex2 + 1));
            currentIndex2++;
          } else {
            clearInterval(typingInterval2);
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval1);
    };
  }, []);

  return (
    <div className="hero-section">
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="hero-content">
        <h2 className="hero-heading">
          <div className="typewriter line1">{text1}</div>
          <div className="typewriter line2">{text2}</div>
        </h2>
        <p className="hero-tagline">
          Find a job you love, and you will never have to work a day in your life.
        </p>
      </div>
    </div>
  );
};

// LoginForm component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const mockUsers = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'test@test.com', password: 'test123' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = mockUsers.find(user =>
        user.email === email && user.password === password
      );
      if (!user) {
        throw new Error('Invalid email or password');
      }
      setSuccess(true);
      alert('Login successful! Redirecting to dashboard...');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">Sign in</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Login successful!</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="forgot-password">
              <span onClick={handleForgotPassword}>Forgot password?</span>
            </div>
          </div>
          <button
            type="submit"
            className="sign-in-button"
            disabled={loading}
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <FaSignInAlt className="button-icon" /> Sign in
              </>
            )}
          </button>
        </form>
        <div className="social-login">
          <p className="social-login-text">Or sign in with</p>
          <div className="social-buttons">
            <button className="social-button google">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/google.svg" alt="Google" />
            </button>
            <button className="social-button facebook">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/facebook.svg" alt="Facebook" />
            </button>
            <button className="social-button linkedin">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg" alt="LinkedIn" />
            </button>
          </div>
        </div>
        <div className="signup-link">
          <p>Not a member? <Link to="/sign-in">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

// Main SignIn Component
function SignIn() {
  return (
    <div className="app">
      <div className="job-board-container">
        <JobBoardHero />
        <LoginForm />
      </div>
    </div>
  );
}

export default SignIn;