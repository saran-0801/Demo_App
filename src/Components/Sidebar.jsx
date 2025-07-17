import React from 'react';
import './Sidebar.css';

function Sidebar({ setSelectedScreen }) {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li onClick={() => setSelectedScreen('Dashboard')}>Dashboard</li>
        <li onClick={() => setSelectedScreen('Profile')}>Profile</li>
        <li onClick={() => setSelectedScreen('Settings')}>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
