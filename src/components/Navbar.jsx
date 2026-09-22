import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, User, Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/live', label: 'Live' },
  { path: '/matches', label: 'Matches' },
  { path: '/teams', label: 'Teams' },
  { path: '/players', label: 'Players' },
  { path: '/points-table', label: 'Points Table' },
  { path: '/statistics', label: 'Statistics' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🏏</span>
          <span className="navbar__logo-text">CricPulse</span>
          <span className="navbar__logo-ball" />
        </Link>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
            >
              {link.label}
              {link.path === '/live' && <span className="navbar__live-dot" />}
            </Link>
          ))}
        </div>

        <div className="navbar__actions">
          <button className="navbar__action-btn" onClick={() => setSearchOpen(!searchOpen)}>
            <Search size={18} />
          </button>
          <Link to="/favorites" className="navbar__action-btn">
            <Heart size={18} />
          </Link>
          <Link to="/login" className="navbar__action-btn">
            <User size={18} />
          </Link>
          <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar__search">
          <div className="container">
            <div className="navbar__search-inner">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search players, teams, matches..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
              <button onClick={() => setSearchOpen(false)}>
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
