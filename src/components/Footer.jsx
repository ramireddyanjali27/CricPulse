import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Send, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span>🏏</span>
              <span className="footer__logo-text">CricPulse</span>
            </Link>
            <p className="footer__tagline">Your Cricket. Your Score. Your Game.</p>
            <div className="footer__socials">
              <a href="#" className="footer__social" title="Instagram"><Globe size={18} /></a>
              <a href="#" className="footer__social" title="Twitter/X"><MessageCircle size={18} /></a>
              <a href="#" className="footer__social" title="YouTube"><Send size={18} /></a>
              <a href="#" className="footer__social" title="LinkedIn"><Mail size={18} /></a>
            </div>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/live">Live Matches</Link>
            <Link to="/matches">Matches</Link>
            <Link to="/teams">Teams</Link>
          </div>
          <div className="footer__col">
            <h4>Explore</h4>
            <Link to="/players">Players</Link>
            <Link to="/points-table">Points Table</Link>
            <Link to="/statistics">Statistics</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
          <div className="footer__col">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin">Admin</Link>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 CricPulse. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
