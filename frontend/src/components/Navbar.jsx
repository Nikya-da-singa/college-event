import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container" aria-label="Main Navigation">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="brand-name">
            Campus<span className="brand-accent">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-nav desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive && !location.hash ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <a
            href="/#events-section"
            className={`nav-link ${location.hash === "#events-section" ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            Events
          </a>

          <NavLink
            to="/admin/add-event"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Create Event
          </NavLink>
        </div>

        {/* Action Button */}
        <div className="navbar-actions desktop-actions">
          <Link to="/admin/add-event" className="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Host Event
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={`mobile-menu-btn ${mobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-dropdown ${mobileMenuOpen ? "show" : ""}`}>
        <div className="mobile-dropdown-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `mobile-nav-link ${isActive && !location.hash ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </NavLink>

          <a
            href="/#events-section"
            className={`mobile-nav-link ${location.hash === "#events-section" ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Events
          </a>

          <NavLink
            to="/admin/add-event"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? "active" : ""}`
            }
            onClick={closeMobileMenu}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Create Event
          </NavLink>

          <div className="mobile-cta-wrapper">
            <Link
              to="/admin/add-event"
              className="btn btn-primary btn-block"
              onClick={closeMobileMenu}
            >
              Host an Event
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
