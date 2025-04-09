import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';  
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Feedback System</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Submit Feedback</Link>
          <Link to="/admin" className="navbar-link">Admin Panel</Link>
     
        </div>
      </div>
    </nav>
  );
}