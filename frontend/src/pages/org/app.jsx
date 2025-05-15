import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import JobManagement from './JobManagement';
import CreateJob from './createjob';
import EditJob from './editjob';
import DeleteJob from './deletejob';
import JobApplicants from './JobApplicants';
import Register from './register';
import Login from './login';

export default function Orgapp() {
  return (
    <Router>
      <div className="org-app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobmangement" element={<JobManagement />} />
          <Route path="/jobs" element={<JobManagement />} />
          <Route path="/createjob" element={<CreateJob />} />
          <Route path="/editjob/:id" element={<EditJob />} />
          <Route path="/deletejob/:id" element={<DeleteJob />} />
          <Route path="/job-applicants/:jobId" element={<JobApplicants />} />
        </Routes>
      </div>
    </Router>
  );
}
