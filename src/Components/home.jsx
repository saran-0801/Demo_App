import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MenuBar from './MenuBar';
import HomeContent from './HomeContent';
import './home.css';
import { Snackbar, Alert } from '@mui/material';

function Home() {
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLogoutSnackbar, setShowLogoutSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const logoutAfterInactivity = () => {
      setShowLogoutSnackbar(true);
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    };

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logoutAfterInactivity, 3 * 60 * 1000); // 3 minutes
    };

    // Listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="homeScreen">
      <div className={`sidebarWrapper ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <Sidebar
          setSelectedScreen={setSelectedScreen}
          isCollapsed={isSidebarCollapsed}
        />
      </div>
      <div className="mainContent">
        <MenuBar onMenuClick={toggleSidebar} />
        <HomeContent selectedScreen={selectedScreen} />
      </div>

      {/* Snackbar for auto logout alert */}
      <Snackbar
        open={showLogoutSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowLogoutSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          Logged out due to inactivity.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
