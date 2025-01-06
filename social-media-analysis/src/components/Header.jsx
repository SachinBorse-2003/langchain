import { Link } from 'react-router-dom';
import { FaChartBar, FaComments, FaInfoCircle } from 'react-icons/fa';
import './styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">SocialAI</h2>
      </div>
      <nav className="header-right">
        <Link to="/" className="nav-item">
          <FaChartBar className="nav-icon" /> Dashboard
        </Link>
        <Link to="/chatbot" className="nav-item">
          <FaComments className="nav-icon" /> Chatbot
        </Link>
        <Link to="/about" className="nav-item">
          <FaInfoCircle className="nav-icon" /> About Us
        </Link>
      </nav>
    </header>
  );
}
