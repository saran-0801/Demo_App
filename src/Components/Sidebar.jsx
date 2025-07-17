import React from 'react';
import './Sidebar.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar({ setSelectedScreen, isCollapsed }) {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <h2>{!isCollapsed && 'Covalsys'}</h2>
      <ul>
        <li onClick={() => setSelectedScreen('Dashboard')}>
          <DashboardIcon />
          {!isCollapsed && <span>Dashboard</span>}
        </li>
        <li onClick={() => setSelectedScreen('Profile')}>
          <PersonIcon />
          {!isCollapsed && <span>Profile</span>}
        </li>
        <li onClick={() => setSelectedScreen('Settings')}>
          <SettingsIcon />
          {!isCollapsed && <span>Settings</span>}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
