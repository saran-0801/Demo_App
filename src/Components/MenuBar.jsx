import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.css';

function MenuBar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      navigate('/'); // redirect to home or login screen
    }
  };

  return (
    <div className="menubar">
      <button className="hamburger" onClick={onMenuClick}>
        ☰
      </button>
      <h2>Covalsys</h2>
      <button className="logoutBtn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MenuBar;
