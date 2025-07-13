import { HashRouter, Route, Routes } from 'react-router'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Demo from './pages/Demo'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import Messages from './pages/Messages'
import Email from './pages/Email'
import { useState } from 'react'

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const [showDemo, setShowDemo] = useState(true);

  // Handle demo login
  const handleDemoLogin = (credentials: { username: string; password: string }) => {
    setShowDemo(false);
    // Auto-fill the login form
    setTimeout(() => {
      login({
        id: credentials.username,
        username: credentials.username,
        password: credentials.password,
        name: credentials.username,
        role: 'Demo User',
        department: 'Demo',
        permissions: ['all_access'],
        status: 'active'
      });
    }, 100);
  };

  // Show demo landing page first
  if (showDemo) {
    return <Demo onStartDemo={handleDemoLogin} />;
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // Show main application
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </HashRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}