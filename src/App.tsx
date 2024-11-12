// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import DocumentUpload from './components/DocumentUpload/DocumentUpload';
import Chat from './components/Chat/Chat';
import './App.css';
import './i18n'; // Import i18n configuration

const App: React.FC = () => {
  const { t, i18n } = useTranslation(); // Initialize translation hook

  // Initialize username from localStorage
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username');
  });

  const handleLogin = (newUsername: string) => {
    // Set username in state and localStorage
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  const handleLogout = () => {
    // Clear authentication state
    setUsername(null);
    localStorage.removeItem('username');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Change language
  };

  return (
    <Router>
      <Navbar username={username} onLogout={handleLogout} changeLanguage={changeLanguage} />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documentation" element={<DocumentUpload />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;