import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand-section">
          <div className="footer-logo">
            <span className="footer-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <span className="footer-logo-text">Campus<span className="brand-accent">Connect</span></span>
          </div>
          <p className="footer-tagline">Discover. Register. Experience.</p>
          <p className="footer-desc">
            The premier campus platform connecting students with workshops, hackathons, cultural festivals, and competitive sports.
          </p>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="/#events-section">Explore Events</a></li>
            <li><Link to="/admin/add-event">Host an Event</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li><span className="footer-category-pill">Technical & Coding</span></li>
            <li><span className="footer-category-pill">Cultural Festivals</span></li>
            <li><span className="footer-category-pill">Sports Tournaments</span></li>
            <li><span className="footer-category-pill">Hands-on Workshops</span></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Project Info</h4>
          <p className="footer-info-text">
            Designed for university event management and seamless student engagement.
          </p>
          <div className="footer-badge">
            <span className="footer-badge-dot"></span>
            <span>Live MongoDB Integration</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          <p className="footer-project-tag">College Event Management System</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
