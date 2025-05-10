import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/auth/landingpage.jsx';
import SignIn from './pages/auth/sign-in.jsx';
// TODO: Import the Combined component when it's available


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/combined" element={<Combined />} /> */}
      </Routes>
    </Router>
  );
}

export default App;