import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faBars, faSearch, faTasks, faCloud, faNewspaper, faCalendarAlt, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Home.css'

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`custom-sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="logo-area" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faRobot} style={{ fontSize: "30px", color: "#FFFFFF" }} />
        <div className="logo-title">{isOpen ? "PersonalAssist IQ" : null}</div><br></br>
        {/* <FontAwesomeIcon 
          icon={faBars} 
          id="btn" 
          style={{ color: "#ffffff", cursor: "pointer" }} 
          aria-label="Toggle sidebar"
        /> */}
      </div>
      <ul className="nav-menu">
        <li className="nav-item search-item">
          <FontAwesomeIcon icon={faSearch} style={{ color: "#000000" }} />
          {isOpen && <input type="text" placeholder="Search..." />}
        </li>
        <li className="nav-item">
          <Link to='/create'>
            <FontAwesomeIcon icon={faTasks} style={{ color: "#000000" }} />
            {isOpen && <span className="links_name">Task Management</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to='/weather'> 
            <FontAwesomeIcon icon={faCloud} style={{ color: "#000000" }} />
            {isOpen && <span className="links_name">Weather Updates</span>}
          </Link>
        </li>
        <li className="nav-item">
        <Link to='/news'>
            <FontAwesomeIcon icon={faNewspaper} style={{ color: "#000000" }} />
            {isOpen && <span className="links_name">News Summarization</span>}
          </Link>
        </li>
        <li className="nav-item">
        <Link to='/calendar'>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "#000000" }} />
            {isOpen && <span className="links_name">Calendar Integration</span>}
          </Link>
        </li>
        <li className="nav-item">
        <Link to='/remind'>
            <FontAwesomeIcon icon={faBell} style={{ color: "#000000" }} />
            {isOpen && <span className="links_name">Reminders</span>}
            </Link>
        </li>
      </ul>
      <li className="nav-item profile-item">
        <div className="profile-details">
          <img className="profile-img" src="../src/assistant1.png" alt="Profile" />
          {isOpen && (
            <div className="profile-info">
              <div className="profile-name">PersonalAssist IQ</div>
              <div className="profile-job">Your Assistant</div>
            </div>
          )}
        </div>
        <Link to='/'>
        <FontAwesomeIcon 
          icon={faSignOutAlt} 
          id="logout-btn" 
          style={{ color: "#ffffff" }} 
          aria-label="Logout"
        />
        </Link>
      </li>
    </div>
  );
}

export default SideBar;
