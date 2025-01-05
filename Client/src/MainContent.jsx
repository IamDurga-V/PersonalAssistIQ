import React from "react";
import './Home.css';
import { Link } from "react-router-dom";
// Import images
import tmImg from "../src/images/tm.jpg";
import wuImg from "../src/images/wu.jpg";
import nuImg from "../src/images/nu.jpg";
import ciImg from "../src/images/ci.jpg";
import reminderImg from "../src/images/reminder.jpg";

const MainContent = () => {
  return (
    <div className="content main-content-gap">
      <div className="sections-container">
        <Link to='/create'>
          <Section title="Task Management" className="task-management">
            <Card
              className="task-card"
              imgSrc={tmImg}
              title="Organize Your Tasks"
              description="Manage your to-do list, prioritize tasks, and stay organized."
            />
          </Section>
        </Link>

        <Link to='/weather'>
          <Section title="Weather Updates" className="weather-updates">
            <Card
              className="weather-card"
              imgSrc={wuImg}
              title="Get Real-time Weather"
              description="Check current weather and forecasts for your area."
            />
          </Section>
        </Link>

        <Link to='/news'>
          <Section title="News Summarization" className="news-summarization">
            <Card
              className="news-card"
              imgSrc={nuImg}
              title="Stay Informed"
              description="Get daily news summaries tailored to your interests."
            />
          </Section>
        </Link>

        <Link to='/calendar'>
          <Section title="Calendar Integration" className="calendar-integration">
            <Card
              className="calendar-card"
              imgSrc={ciImg}
              title="Manage Your Schedule"
              description="Sync your tasks and events with Google Calendar for easy access."
            />
          </Section>
        </Link>

        <Link to='/remind'>
          <Section title="Reminders" className="reminders">
            <Card
              className="reminder-card"
              imgSrc={reminderImg}
              title="Stay Alert"
              description="Receive timely reminders for tasks and events."
            />
          </Section>
        </Link>
      </div>
    </div>
  );
};

const Section = ({ title, children, className }) => (
  <div className={`section ${className}`}>
    <h2>{title}</h2>
    <div className="cards">{children}</div>
  </div>
);

const Card = ({ imgSrc, title, description, className }) => (
  <div className={`card ${className}`}>
    <img src={imgSrc} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default MainContent;
