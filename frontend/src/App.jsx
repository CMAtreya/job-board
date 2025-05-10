import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/auth/landingpage';
import OrgDashboard from './pages/org/OrgDashboard'; // Change to your actual org component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/org" element={<OrgDashboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;