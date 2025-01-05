// src/Home.jsx
import React from 'react';
import SideBar from './SideBar';
import MainContent from './MainContent';
import './Home.css'
function Home() {
    return (
        <div className="home-container">
            <SideBar/>
            <MainContent />
        </div>
    );
}
export default Home;
