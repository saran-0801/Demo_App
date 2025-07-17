import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MenuBar from './MenuBar';
import HomeContent from './HomeContent';
import './home.css';

function Home() {
  const [selectedScreen, setSelectedScreen] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="homeScreen">
      <div className={`sidebarWrapper ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar setSelectedScreen={(screen) => {
          setSelectedScreen(screen);
          setIsSidebarOpen(false); // close on select
        }} />
      </div>
      <div className="mainContent">
        <MenuBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <HomeContent selectedScreen={selectedScreen} />
      </div>
    </div>
  );
}

export default Home;
