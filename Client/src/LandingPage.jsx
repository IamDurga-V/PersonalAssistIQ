import React from 'react';
import './App.css';
import backgroundImage from './assets/background.jpg';  // Import the background image
import tmImage from './assets/lltm.jpg';  // Task Management Image
import wuImage from './assets/llwu.jpg';  // Weather Updates Image
import nuImage from './assets/llnu.jpg';  // News Updates Image
import ciImage from './assets/llci.jpg';  // Calendar Integration Image
import remImage from './assets/llrem.jpg';  // Reminders Image
import appLogo  from './assistant.png';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Page Heading */}
      <h1 className="page-heading">PersonalAssist IQ</h1>

      {/* Hero section with transparent background image */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="hero-overlay">
          {/* App logo above the button */}
          <img src={appLogo} alt="App Logo" className="app-logo" />

          <p className="hero-description">
            PersonalAssist IQ – your all-in-one assistant for productivity. Simplify tasks, stay updated, and achieve more every day.
          </p>
          <Link to='register'>
          <button className="hero-cta">Start Now</button></Link>
        </div>
      </div>

      {/* Features section */}
      <div className="features-section">
        <h2 className="features-title">Features of PersonalAssist IQ</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={tmImage} alt="Task Management Icon" className="feature-icon" />
            <h3>Smart Task Management</h3>
          </div>
          <div className="feature-card">
            <img src={wuImage} alt="Weather Updates Icon" className="feature-icon" />
            <h3>Weather Updates</h3>
          </div>
          <div className="feature-card">
            <img src={nuImage} alt="News Updates Icon" className="feature-icon" />
            <h3>News Updates</h3>
          </div>
          <div className="feature-card">
            <img src={ciImage} alt="Calendar Integration Icon" className="feature-icon" />
            <h3>Calendar Integration</h3>
          </div>
          <div className="feature-card">
            <img src={remImage} alt="Reminders Icon" className="feature-icon" />
            <h3>Personalized Reminders</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
