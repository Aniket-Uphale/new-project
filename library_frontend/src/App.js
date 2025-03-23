import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import AdminLogin from './Pages/AdminLogin';
import Dashboard from './Pages/Dashboard';
import AdminSignup from './Pages/AdminSignup';
function App() {
    return (
        <Router>
          <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<AdminSignup />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
