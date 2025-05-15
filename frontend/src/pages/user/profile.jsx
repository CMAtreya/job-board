import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user/profile.css';

export default function Profile() {
  // State for view/edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State for user profile data
  const [profileData, setProfileData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    location: '',
    profilePicture: null,
    
    // Professional Details
    education: [
      { id: 1, degree: '', institution: '', year: '', cgpa: '' }
    ],
    skills: [],
    workExperience: [
      { id: 1, jobTitle: '', company: '', duration: '', description: '' }
    ],
    
    // Projects
    projects: [
      { id: 1, title: '', link: '', projectFile: null }
    ],
    
    // Resume
    resume: null,
    
    // Social Links
    socialLinks: {
      linkedin: '',
      github: '',
      portfolio: ''
    }
  });
  
  // State for profile completion percentage
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  // State for form validation errors
  const [errors, setErrors] = useState({});
  
  // Load user data on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockUserData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      location: 'New York, NY',
      profilePicture: null,
      education: [
        { id: 1, degree: 'Bachelor of Science in Computer Science', institution: 'Tech University', year: '2020', cgpa: '3.8' }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
      workExperience: [
        { 
          id: 1, 
          jobTitle: 'Frontend Developer', 
          company: 'Tech Solutions Inc.', 
          duration: 'Jan 2021 - Present', 
          description: 'Developing and maintaining web applications using React.js and related technologies.'
        }
      ],
      projects: [
        { id: 1, title: 'E-commerce Website', link: 'https://github.com/johndoe/ecommerce', projectFile: null }
      ],
      resume: null,
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        portfolio: 'https://johndoe.dev'
      }
    };
    
    setProfileData(mockUserData);
    calculateProfileCompletion(mockUserData);
  }, []);
  
  // Calculate profile completion percentage
  const calculateProfileCompletion = (data) => {
    const totalFields = 10; // Total number of main sections to fill
    let filledFields = 0;
    
    if (data.fullName) filledFields++;
    if (data.email) filledFields++;
    if (data.phone) filledFields++;
    if (data.location) filledFields++;
    if (data.profilePicture) filledFields++;
    if (data.education.length > 0 && data.education[0].degree) filledFields++;
    if (data.skills.length > 0) filledFields++;
    if (data.workExperience.length > 0 && data.workExperience[0].jobTitle) filledFields++;
    if (data.projects.length > 0 && data.projects[0].title) filledFields++;
    if (data.resume) filledFields++;
    
    const percentage = Math.round((filledFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  };
  
  // Handle input changes for personal information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Handle social links changes
  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      socialLinks: {
        ...profileData.socialLinks,
        [name]: value
      }
    });
  };
  
  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...profileData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setProfileData({
      ...profileData,
      education: updatedEducation
    });
  };
  
  // Add new education entry
  const addEducation = () => {
    setProfileData({
      ...profileData,
      education: [
        ...profileData.education,
        { id: Date.now(), degree: '', institution: '', year: '' }
      ]
    });
  };
  
  // Remove education entry
  const removeEducation = (index) => {
    if (profileData.education.length > 1) {
      const updatedEducation = [...profileData.education];
      updatedEducation.splice(index, 1);
      
      setProfileData({
        ...profileData,
        education: updatedEducation
      });
    }
  };
  
  // Handle work experience changes
  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...profileData.workExperience];
    updatedWorkExperience[index] = {
      ...updatedWorkExperience[index],
      [field]: value
    };
    
    setProfileData({
      ...profileData,
      workExperience: updatedWorkExperience
    });
  };
  
  // Add new work experience entry
  const addWorkExperience = () => {
    setProfileData({
      ...profileData,
      workExperience: [
        ...profileData.workExperience,
        { id: Date.now(), jobTitle: '', company: '', duration: '', description: '' }
      ]
    });
  };
  
  // Remove work experience entry
  const removeWorkExperience = (index) => {
    if (profileData.workExperience.length > 1) {
      const updatedWorkExperience = [...profileData.workExperience];
      updatedWorkExperience.splice(index, 1);
      
      setProfileData({
        ...profileData,
        workExperience: updatedWorkExperience
      });
    }
  };
  
  // Handle project changes
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...profileData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    
    setProfileData({
      ...profileData,
      projects: updatedProjects
    });
  };
  
  // Add new project entry
  const addProject = () => {
    setProfileData({
      ...profileData,
      projects: [
        ...profileData.projects,
        { id: Date.now(), title: '', link: '' }
      ]
    });
  };
  
  // Remove project entry
  const removeProject = (index) => {
    if (profileData.projects.length > 1) {
      const updatedProjects = [...profileData.projects];
      updatedProjects.splice(index, 1);
      
      setProfileData({
        ...profileData,
        projects: updatedProjects
      });
    }
  };
  
  // Handle skills input
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    setProfileData({
      ...profileData,
      skills: skillsArray
    });
  };
  
  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just store it in state
      setProfileData({
        ...profileData,
        profilePicture: URL.createObjectURL(file)
      });
    }
  };
  
  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just store it in state
      setProfileData({
        ...profileData,
        resume: {
          name: file.name,
          url: URL.createObjectURL(file)
        }
      });
    }
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  
  // Save changes
  const saveChanges = () => {
    // Validate form
    const newErrors = {};
    
    if (!profileData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!profileData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    
    // If no errors, save changes
    if (Object.keys(newErrors).length === 0) {
      // In a real app, you would send this data to a server
      console.log('Profile data saved:', profileData);
      calculateProfileCompletion(profileData);
      setIsEditMode(false);
    }
  };
  
  // Cancel edit mode
  const cancelEdit = () => {
    // In a real app, you would reload the data from the server
    // For now, we'll just exit edit mode
    setIsEditMode(false);
    setErrors({});
  };
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <Link to="/" className="back-button"><i className="fas fa-arrow-left"></i> Back to Dashboard</Link>
        <h1>User Profile</h1>
        <div className="profile-completion">
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p>{completionPercentage}% Complete</p>
        </div>
      </div>
      
      <div className="profile-content">
        {/* Personal Information Section */}
        <section className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-picture-container">
            {profileData.profilePicture ? (
              <img 
                src={profileData.profilePicture} 
                alt="Profile" 
                className="profile-picture" 
              />
            ) : (
              <div className="profile-picture-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
            {isEditMode && (
              <div className="profile-picture-upload">
                <label htmlFor="profile-picture-input" className="upload-button">
                  <i className="fas fa-camera"></i> Change Photo
                </label>
                <input 
                  type="file" 
                  id="profile-picture-input" 
                  accept="image/*" 
                  onChange={handleProfilePictureUpload} 
                  style={{ display: 'none' }} 
                />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Full Name</label>
            {isEditMode ? (
              <>
                <input 
                  type="text" 
                  name="fullName" 
                  value={profileData.fullName} 
                  onChange={handleInputChange} 
                  className={errors.fullName ? 'error' : ''} 
                />
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}
              </>
            ) : (
              <p>{profileData.fullName || 'Not specified'}</p>
            )}
          </div>
          
          <div className="form-group">
            <label>Email (non-editable)</label>
            <p>{profileData.email || 'Not specified'}</p>
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            {isEditMode ? (
              <>
                <input 
                  type="text" 
                  name="phone" 
                  value={profileData.phone} 
                  onChange={handleInputChange} 
                  className={errors.phone ? 'error' : ''} 
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </>
            ) : (
              <p>{profileData.phone || 'Not specified'}</p>
            )}
          </div>
          
          <div className="form-group">
            <label>Location</label>
            {isEditMode ? (
              <>
                <input 
                  type="text" 
                  name="location" 
                  value={profileData.location} 
                  onChange={handleInputChange} 
                  className={errors.location ? 'error' : ''} 
                />
                {errors.location && <p className="error-message">{errors.location}</p>}
              </>
            ) : (
              <p>{profileData.location || 'Not specified'}</p>
            )}
          </div>
        </section>
        
        {/* Professional Details Section */}
        <section className="profile-section">
          <h2>Professional Details</h2>
          
          {/* Education */}
          <div className="subsection">
            <h3>Education</h3>
            {profileData.education.map((edu, index) => (
              <div key={edu.id} className="education-item">
                {isEditMode ? (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Degree</label>
                        <input 
                          type="text" 
                          value={edu.degree} 
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Institution</label>
                        <input 
                          type="text" 
                          value={edu.institution} 
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Year</label>
                        <input 
                          type="text" 
                          value={edu.year} 
                          onChange={(e) => handleEducationChange(index, 'year', e.target.value)} 
                        />
                      </div>
                    </div>
                    {profileData.education.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-button" 
                        onClick={() => removeEducation(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="education-details">
                    <p className="education-degree">{edu.degree || 'Not specified'}</p>
                    <p className="education-institution">{edu.institution || 'Not specified'}</p>
                    <p className="education-year">{edu.year || 'Not specified'}</p>
                  </div>
                )}
              </div>
            ))}
            {isEditMode && (
              <button type="button" className="add-button" onClick={addEducation}>
                <i className="fas fa-plus"></i> Add Education
              </button>
            )}
          </div>
          
          {/* Skills */}
          <div className="subsection">
            <h3>Skills</h3>
            {isEditMode ? (
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Enter skills separated by commas" 
                  value={profileData.skills.join(', ')} 
                  onChange={handleSkillsChange} 
                />
                <p className="help-text">Enter skills separated by commas (e.g., JavaScript, React, CSS)</p>
              </div>
            ) : (
              <div className="skills-container">
                {profileData.skills.length > 0 ? (
                  profileData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))
                ) : (
                  <p>No skills specified</p>
                )}
              </div>
            )}
          </div>
          
          {/* Work Experience */}
          <div className="subsection">
            <h3>Work Experience</h3>
            {profileData.workExperience.map((exp, index) => (
              <div key={exp.id} className="work-experience-item">
                {isEditMode ? (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Job Title</label>
                        <input 
                          type="text" 
                          value={exp.jobTitle} 
                          onChange={(e) => handleWorkExperienceChange(index, 'jobTitle', e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Company</label>
                        <input 
                          type="text" 
                          value={exp.company} 
                          onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Duration</label>
                        <input 
                          type="text" 
                          value={exp.duration} 
                          onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        value={exp.description} 
                        onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)} 
                      ></textarea>
                    </div>
                    {profileData.workExperience.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-button" 
                        onClick={() => removeWorkExperience(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </>
                ) : (
                  <div className="work-experience-details">
                    <div className="work-header">
                      <h4>{exp.jobTitle || 'Not specified'}</h4>
                      <p className="work-duration">{exp.duration || 'Not specified'}</p>
                    </div>
                    <p className="work-company">{exp.company || 'Not specified'}</p>
                    <p className="work-description">{exp.description || 'Not specified'}</p>
                  </div>
                )}
              </div>
            ))}
            {isEditMode && (
              <button type="button" className="add-button" onClick={addWorkExperience}>
                <i className="fas fa-plus"></i> Add Work Experience
              </button>
            )}
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="profile-section">
          <h2>Projects</h2>
          {profileData.projects.map((project, index) => (
            <div key={project.id} className="project-item">
              {isEditMode ? (
                <>
                  <div className="form-row">
                  <div className="form-group">
                    <label>Project Title</label>
                    <input 
                      type="text" 
                      value={project.title} 
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>GitHub/Live Link</label>
                    <input 
                      type="text" 
                      value={project.link} 
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Project File</label>
                  <div className="resume-upload">
                    <label htmlFor={`project-file-${index}`} className="upload-button">
                      <i className="fas fa-file-upload"></i> {project.projectFile ? 'Replace File' : 'Upload File'}
                    </label>
                    <input 
                      type="file" 
                      id={`project-file-${index}`} 
                      accept=".pdf,.doc,.docx,.zip,.rar,.ppt,.pptx" 
                      onChange={(e) => handleProjectFileUpload(index, e)} 
                      style={{ display: 'none' }} 
                    />
                    {project.projectFile && (
                      <p className="resume-filename">{project.projectFile.name}</p>
                    )}
                  </div>
                </div>
                  {profileData.projects.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-button" 
                      onClick={() => removeProject(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </>
              ) : (
                <div className="project-details">
                  <h4>{project.title || 'Not specified'}</h4>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fas fa-external-link-alt"></i> View Project
                    </a>
                  ) : (
                    <p>No link specified</p>
                  )}
                </div>
              )}
            </div>
          ))}
          {isEditMode && (
            <button type="button" className="add-button" onClick={addProject}>
              <i className="fas fa-plus"></i> Add Project
            </button>
          )}
        </section>
        
        {/* Resume Upload Section */}
        <section className="profile-section">
          <h2>Resume</h2>
          {isEditMode ? (
            <div className="resume-upload">
              <label htmlFor="resume-input" className="upload-button">
                <i className="fas fa-file-upload"></i> {profileData.resume ? 'Replace Resume' : 'Upload Resume'}
              </label>
              <input 
                type="file" 
                id="resume-input" 
                accept=".pdf,.doc,.docx" 
                onChange={handleResumeUpload} 
                style={{ display: 'none' }} 
              />
              {profileData.resume && (
                <p className="resume-filename">{profileData.resume.name}</p>
              )}
            </div>
          ) : (
            <div className="resume-display">
              {profileData.resume ? (
                <div className="resume-actions">
                  <p className="resume-filename">{profileData.resume.name}</p>
                  <div className="resume-buttons">
                    <a href={profileData.resume.url} target="_blank" rel="noopener noreferrer" className="view-button">
                      <i className="fas fa-eye"></i> View
                    </a>
                    <a href={profileData.resume.url} download className="download-button">
                      <i className="fas fa-download"></i> Download
                    </a>
                  </div>
                </div>
              ) : (
                <p>No resume uploaded</p>
              )}
            </div>
          )}
        </section>
        
        {/* Social Links Section */}
        <section className="profile-section">
          <h2>Social Links</h2>
          <div className="social-links">
            <div className="form-group">
              <label>
                <i className="fab fa-linkedin"></i> LinkedIn
              </label>
              {isEditMode ? (
                <input 
                  type="text" 
                  name="linkedin" 
                  value={profileData.socialLinks.linkedin} 
                  onChange={handleSocialLinkChange} 
                />
              ) : (
                profileData.socialLinks.linkedin ? (
                  <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    {profileData.socialLinks.linkedin}
                  </a>
                ) : (
                  <p>Not specified</p>
                )
              )}
            </div>
            
            <div className="form-group">
              <label>
                <i className="fab fa-github"></i> GitHub
              </label>
              {isEditMode ? (
                <input 
                  type="text" 
                  name="github" 
                  value={profileData.socialLinks.github} 
                  onChange={handleSocialLinkChange} 
                />
              ) : (
                profileData.socialLinks.github ? (
                  <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    {profileData.socialLinks.github}
                  </a>
                ) : (
                  <p>Not specified</p>
                )
              )}
            </div>
            
            <div className="form-group">
              <label>
                <i className="fas fa-globe"></i> Portfolio
              </label>
              {isEditMode ? (
                <input 
                  type="text" 
                  name="portfolio" 
                  value={profileData.socialLinks.portfolio} 
                  onChange={handleSocialLinkChange} 
                />
              ) : (
                profileData.socialLinks.portfolio ? (
                  <a href={profileData.socialLinks.portfolio} target="_blank" rel="noopener noreferrer">
                    {profileData.socialLinks.portfolio}
                  </a>
                ) : (
                  <p>Not specified</p>
                )
              )}
            </div>
          </div>
        </section>
      </div>
      
      {/* Action Buttons */}
      <div className="profile-actions">
        {isEditMode ? (
          <>
            <button type="button" className="btn-save" onClick={saveChanges}>
              <i className="fas fa-save"></i> Save Changes
            </button>
            <button type="button" className="btn-cancel" onClick={cancelEdit}>
              <i className="fas fa-times"></i> Cancel
            </button>
          </>
        ) : (
          <button type="button" className="btn-edit" onClick={toggleEditMode}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
