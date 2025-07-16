import React from 'react';
import Sidebar from './Sidebar';
import MenuBar from './MenuBar';
import HomeContent from './HomeContent';
import './home.css';

function Home() {
  return (
    <div className="homeScreen">
      <Sidebar />
      <div className="mainContent">
        <MenuBar />
        <HomeContent />
      </div>
    </div>
  );
}

export default Home;
