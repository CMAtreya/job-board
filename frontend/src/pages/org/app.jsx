import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import Jobs from './Jobs';
import JobForm from './JobForm';
import Applications from './Applications';

const OrgApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="job/new" element={<JobForm />} />
        <Route path="job/edit/:id" element={<JobForm />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:jobId" element={<Applications />} />
      </Route>
    </Routes>
  );
};

export default OrgApp;