import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userapp from './pages/user/app';
import Profile from './pages/user/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userapp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;