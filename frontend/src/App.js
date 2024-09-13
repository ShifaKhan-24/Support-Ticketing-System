import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AgentPage from './components/AgentPage';
import LoginPage from './components/Login';
import Register from './components/Register';
import CustomerPage from './components/CustomerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer/*" element={<CustomerPage />} />
        <Route path="/agent/*" element={<AgentPage />} />
      </Routes>
    </Router>
  );
}

export default App;

