import { FaCheckCircle, FaUsers, FaRobot, FaChartBar } from "react-icons/fa";
import './styles/About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">
          About SocialAI
        </h1>
        <p className="about-description">
          SocialAI is an advanced platform that combines AI insights with data analytics to optimize your social media performance.
        </p>

        <h2 className="about-subtitle">
          <FaChartBar className="icon" /> Features
        </h2>
        <ul className="features-list">
          <li><FaCheckCircle className="check-icon" /> Real-time analytics dashboard</li>
          <li><FaCheckCircle className="check-icon" /> AI-powered content analysis</li>
          <li><FaCheckCircle className="check-icon" /> Engagement metrics tracking</li>
          <li><FaCheckCircle className="check-icon" /> Category performance insights</li>
          <li><FaCheckCircle className="check-icon" /> Interactive data visualization</li>
        </ul>

        <h2 className="about-title">
          <FaRobot className="icon" /> About NeuSec
        </h2>
        <p className="about-description">
          NeuSec is a dynamic team dedicated to crafting innovative solutions in AI, cybersecurity, and analytics to empower businesses.
        </p>

        <h2 className="about-subtitle">
          <FaUsers className="icon" /> Our Team
        </h2>
        <ul className="team-list">
          <li>Sachin Borse</li>
          <li>Nikhil Kurle</li>
          <li>Harshvardhan Konda</li>
          <li>Rohan Dodake</li>
          <li>Rushikesh Bhogade</li>
        </ul>
      </div>
    </div>
  );
}
