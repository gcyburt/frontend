// frontend/src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import DocumentUpload from './components/DocumentUpload/DocumentUpload';
import Chat from './components/Chat/Chat';
import './App.css';
import './i18n';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username');
  });

  const handleLogin = (newUsername: string) => {
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('username');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      {username && (
        <Navbar username={username} onLogout={handleLogout} changeLanguage={changeLanguage} />
      )}
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