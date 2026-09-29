import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { getEvents } from "../api/api";

const CATEGORIES = [
  "All",
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
  "Competition",
];

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEvents();
      setEvents(response.data);
    } catch (err) {
      console.error(err);
      setError(
        "Could not load events. Make sure the backend server and MongoDB are running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Filter events by category and search query
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Competition"
          ? event.category?.toLowerCase() === "competition" ||
            event.title?.toLowerCase().includes("competition")
          : event.category?.toLowerCase() === selectedCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        event.title?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.venue?.toLowerCase().includes(query) ||
        event.organizer?.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span className="hero-badge-text">Campus Events Hub</span>
            </div>

            <h1 className="hero-title">
              Your Campus.
              <br />
              <span className="hero-title-accent">Your Events.</span>
              <br />
              Your Experience.
            </h1>

            <p className="hero-subtitle">
              Discover exciting college events, workshops, competitions and
              activities happening around campus.
            </p>

            <div className="hero-buttons">
              <a href="#events-section" className="btn btn-primary btn-lg">
                <span>Explore Events</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </a>

              <Link to="/admin/add-event" className="btn btn-secondary-light btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Host an Event</span>
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free Registration</span>
              </div>
              <div className="stat-divider"></div>
              <div className="hero-stat-item">
                <span className="stat-number">Real-Time</span>
                <span className="stat-label">Seat Reservation</span>
              </div>
              <div className="stat-divider"></div>
              <div className="hero-stat-item">
                <span className="stat-number">All</span>
                <span className="stat-label">Departments</span>
              </div>
            </div>
          </div>

          {/* Abstract Event Illustration / Graphic */}
          <div className="hero-illustration" aria-hidden="true">
            <div className="illustration-glow"></div>
            <div className="illustration-card-stack">
              {/* Floating Ticket Card */}
              <div className="floating-card card-primary">
                <div className="floating-badge">Featured</div>
                <div className="floating-card-body">
                  <div className="floating-card-header">
                    <span className="category-pill-sm">Technical</span>
                    <span className="live-status">
                      <span className="live-dot"></span>
                      Open Now
                    </span>
                  </div>
                  <h4 className="floating-title">Annual Hackathon 2026</h4>
                  <p className="floating-meta">📍 Central Tech Block • 150 Seats</p>
                </div>
              </div>

              {/* Secondary Floating Card */}
              <div className="floating-card card-secondary">
                <div className="card-secondary-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div>
                  <div className="card-secondary-title">Live Campus Buzz</div>
                  <div className="card-secondary-sub">Connect with student clubs</div>
                </div>
              </div>

              {/* Decorative Geometric Rings */}
              <div className="geometric-ring ring-1"></div>
              <div className="geometric-ring ring-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events-section" className="events-section">
        <div className="section-header-block">
          <div className="section-title-wrap">
            <span className="section-badge">Upcoming Schedule</span>
            <h2 className="section-title">Explore Campus Events</h2>
            <p className="section-subtitle">
              Browse workshops, technical hackathons, cultural festivals, and sports meets.
            </p>
          </div>

          <div className="header-actions">
            <button
              onClick={loadEvents}
              className="btn btn-outline btn-sm"
              title="Refresh event list from database"
              aria-label="Refresh events"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="filter-controls-card">
          <div className="category-filters-list" role="tablist" aria-label="Event categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`category-filter-btn ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-box">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search by title, venue, organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search events"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Events Content States */}
        {loading ? (
          <div className="skeleton-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="skeleton-card">
                <div className="skeleton-line skeleton-badge"></div>
                <div className="skeleton-line skeleton-title"></div>
                <div className="skeleton-line skeleton-text"></div>
                <div className="skeleton-line skeleton-text-short"></div>
                <div className="skeleton-line skeleton-btn"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="error-card">
            <div className="error-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="error-content">
              <h3>Unable to Connect</h3>
              <p>{error}</p>
              <button className="btn btn-primary btn-sm" onClick={loadEvents}>
                Try Again
              </button>
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="empty-title">
              {events.length === 0 ? "No Events Scheduled Yet" : "No Matching Events Found"}
            </h3>
            <p className="empty-desc">
              {events.length === 0
                ? "Be the first to bring a new campus experience to life by hosting an event."
                : `No events matched the category "${selectedCategory}" or search query. Try clearing your filters.`}
            </p>
            {events.length === 0 ? (
              <Link to="/admin/add-event" className="btn btn-primary">
                Host First Event
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* "Why CampusConnect?" Statistics / Feature Section */}
      <section className="features-section">
        <div className="features-header">
          <span className="section-badge">Student First</span>
          <h2 className="section-title">Why CampusConnect?</h2>
          <p className="section-subtitle">
            A unified college platform designed to elevate campus life and simplify event organization.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper icon-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3 className="feature-title">Discover Events</h3>
            <p className="feature-desc">
              Explore academic seminars, coding hackathons, sports tournaments, and cultural fests all updated in real time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper icon-coral">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="feature-title">Easy Registration</h3>
            <p className="feature-desc">
              Hassle-free instant registration using your roll number. Get your spot secured with automated capacity tracking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper icon-purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="feature-title">One Campus Community</h3>
            <p className="feature-desc">
              Bridge student clubs, faculty departments, and organizers to create a vibrant, collaborative campus environment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
