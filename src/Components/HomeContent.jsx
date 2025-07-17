import React from 'react';
import './HomeContent.css';

function HomeContent({ selectedScreen }) {
  return (
    <div className="homeContent">
      {selectedScreen === 'Dashboard' && (
        <>
          <h1>Dashboard</h1>
          <p>This is your main dashboard overview.</p>
        </>
      )}
      {selectedScreen === 'Profile' && (
        <>
          <h1>Profile</h1>
          <p>View and edit your profile here.</p>
        </>
      )}
      {selectedScreen === 'Settings' && (
        <>
          <h1>Settings</h1>
          <p>Change your preferences and app settings.</p>
        </>
      )}
    </div>
  );
}

export default HomeContent;
