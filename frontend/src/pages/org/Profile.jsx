import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    logo: '',
    website: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch company profile data
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/org/profile');
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load profile data. Please try again.');
        console.error('Error fetching profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    // Handle file upload for logo
    const file = e.target.files[0];
    if (file) {
      // You would typically upload this to a server and get a URL back
      // For now, we'll create a local URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post('/api/org/profile', profile);
      setIsEditing(false);
      setError(null);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profile.name) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>Company Profile</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="dashboard-card">
        {!isEditing ? (
          <div>
            <div className="profile-card">
              <div className="profile-image">
                {profile.logo ? (
                  <img src={profile.logo} alt={profile.name} />
                ) : (
                  <i className="fas fa-building" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                )}
              </div>
              <div className="profile-info">
                <h2>{profile.name || 'Your Company Name'}</h2>
                {profile.website && (
                  <p>
                    <i className="fas fa-globe"></i> 
                    <a href={profile.website} target="_blank" rel="noopener noreferrer">
                      {profile.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
            
            <div className="profile-description">
              <h3>About</h3>
              <p>{profile.description || 'No company description available.'}</p>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={() => setIsEditing(true)}
              style={{ marginTop: '20px' }}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="name">Company Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="logo">Company Logo</label>
              <input
                type="file"
                id="logo"
                name="logo"
                className="form-control"
                onChange={handleLogoChange}
                accept="image/*"
              />
              {profile.logo && (
                <div className="mt-2">
                  <img 
                    src={profile.logo} 
                    alt="Preview" 
                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                  />
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                className="form-control"
                value={profile.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Company Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={profile.description}
                onChange={handleChange}
                rows="5"
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;