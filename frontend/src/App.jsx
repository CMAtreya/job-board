import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/auth/landingpage';
import OrgApp from './pages/org/app';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/org/*" element={<OrgApp />} />
      </Routes>
    </Router>
  );
}

export default App;