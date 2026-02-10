import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserLogin from './components/user/UserLogin';
import UserRegister from './components/user/UserRegister';
import UserDashboard from './components/user/UserDashboard';
import LandingPage from './components/LandingPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authView, setAuthView] = useState<'landing' | 'admin-login' | 'user-login' | 'user-register'>('landing');

  useEffect(() => {
    // Check if admin is already logged in
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      setCurrentUser(admin);
      setIsAuthenticated(true);
      setAuthView('admin-login');
      return;
    }

    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setAuthView('user-login');
    }
  }, []);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    if (user.role === 'admin') {
      localStorage.setItem('adminUser', JSON.stringify(user));
      setAuthView('admin-login');
    } else {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setAuthView('user-login');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    if (authView === 'admin-login') {
      localStorage.removeItem('adminUser');
    } else {
      localStorage.removeItem('currentUser');
    }
    setAuthView('landing');
  };

  // Show authentication screens
  if (!isAuthenticated) {
    if (authView === 'landing') {
      return (
        <LandingPage
          onGetStarted={() => setAuthView('user-login')}
          onAdminLogin={() => setAuthView('admin-login')}
        />
      );
    } else if (authView === 'admin-login') {
      return <Login onLogin={handleLogin} onSwitchToUser={() => setAuthView('user-login')} />;
    } else if (authView === 'user-login') {
      return (
        <UserLogin
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthView('user-register')}
        />
      );
    } else if (authView === 'user-register') {
      return (
        <UserRegister
          onRegister={handleLogin}
          onSwitchToLogin={() => setAuthView('user-login')}
        />
      );
    }
  }

  // Show appropriate dashboard based on user role
  if (currentUser?.role === 'admin') {
    return <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return <UserDashboard currentUser={currentUser} onLogout={handleLogout} />;
}