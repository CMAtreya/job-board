import React, { useState, useEffect } from 'react';
import '../../styles/auth/landingpage.css' // Import your CSS file here

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="logo">Job Portal</div> 
        <div className={`mobile-menu-icon ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={mobileMenuOpen ? 'active' : ''}>
          <ul>
            <li><a href="#" className="active">Home</a></li>
            <li><a href="#">Browse Jobs</a></li>
            <li><a href="#">Post a Job</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <a href="#" className="btn btn-outline">Sign In</a>
          <a href="#" className="btn btn-primary">Sign Up</a>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Find your dream job";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <section className="hero">
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="typewriter">{text}</h1>
          <p>Find a job you love, and you will never have to work a day in your life.</p>
          <div className="search-box">
            <div className="search-input">
              <i className="fas fa-briefcase"></i>
              <input type="text" placeholder="Job title" />
            </div>
            <div className="search-input">
              <i className="fas fa-map-marker-alt"></i>
              <input type="text" placeholder="Location" />
            </div>
            <button className="btn btn-primary search-btn">Search Jobs</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Categories Component
const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Technology',
      icon: 'fas fa-laptop-code',
      count: 1204
    },
    {
      id: 2,
      name: 'Marketing',
      icon: 'fas fa-chart-line',
      count: 856
    },
    {
      id: 3,
      name: 'Healthcare',
      icon: 'fas fa-heartbeat',
      count: 1432
    },
    {
      id: 4,
      name: 'Finance',
      icon: 'fas fa-university',
      count: 943
    }
  ];

  return (
    <section className="categories">
      <div className="container">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-icon">
                <i className={category.icon}></i>
              </div>
              <h3>{category.name}</h3>
              <p>{category.count} Jobs</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// JobCard Component
const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <div className="job-details">
        <p><i className="fas fa-building"></i> {job.company}</p>
        <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
        <p><i className="fas fa-clock"></i> {job.type}</p>
        <p><i className="fas fa-money-bill-wave"></i> {job.salary}</p>
      </div>
      <a href="#" className="btn btn-outline-small">View Details</a>
    </div>
  );
};

// FeaturedJobs Component
const FeaturedJobs = () => {
  const jobs = [
    {
      id: 1,
      title: 'Marketing Manager',
      company: 'Company A',
      location: 'New York, NY',
      type: 'Full-Time',
      salary: '$60,000 - $80,000'
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Company B',
      location: 'San Francisco, CA',
      type: 'Full-Time',
      salary: '$90,000 - $120,000'
    },
    {
      id: 3,
      title: 'Registered Nurse',
      company: 'Company C',
      location: 'Chicago, IL',
      type: 'Part-Time',
      salary: '$40 - $60 per hour'
    },
    {
      id: 4,
      title: 'Project Manager',
      company: 'Company D',
      location: 'Austin, TX',
      type: 'Full-Time',
      salary: '$70,000 - $90,000'
    }
  ];

  return (
    <section className="featured-jobs">
      <div className="container">
        <h2>Featured Jobs</h2>
        <div className="jobs-grid">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="view-all-jobs">
          <a href="#" className="btn btn-outline">View All Jobs</a>
        </div>
      </div>
    </section>
  );
};

// HowItWorks Component
const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Create an Account',
      description: 'Sign up and complete your profile to get started'
    },
    {
      id: 2,
      title: 'Search Jobs',
      description: 'Browse through thousands of job listings'
    },
    {
      id: 3,
      title: 'Apply',
      description: 'Submit your application with just a few clicks'
    },
    {
      id: 4,
      title: 'Get Hired',
      description: 'Land your dream job and start your new career'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>How It Works</h2>
        <div className="steps-grid">
          {steps.map(step => (
            <div key={step.id} className="step-card">
              <div className="step-number">{step.id}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <p>Find your dream job with our platform. We connect talented professionals with top companies.</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">Post a Job</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>For Employers</h3>
            <ul>
              <li><a href="#">Post a Job</a></li>
              <li><a href="#">Browse Candidates</a></li>
              <li><a href="#">Pricing Plans</a></li>
              <li><a href="#">Featured Jobs</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p><i className="fas fa-map-marker-alt"></i> 123 Job Street, Work City</p>
            <p><i className="fas fa-phone"></i> (123) 456-7890</p>
            <p><i className="fas fa-envelope"></i> info@jobportal.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <FeaturedJobs />
      <Categories />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;