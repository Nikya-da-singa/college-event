import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getEventById, registerForEvent } from "../api/api";

const emptyForm = {
  name: "",
  email: "",
  rollNumber: "",
  department: "",
};

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setIsError(false);
        setMessage("");
        const response = await getEventById(id);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setMessage(
          error.response?.data?.message || "Could not load this event. It may have been removed."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      setIsError(false);
      setIsSuccess(false);

      await registerForEvent({
        eventId: id,
        ...form,
      });

      setIsSuccess(true);
      setMessage("You've successfully registered for this event.");
      setForm(emptyForm);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please verify your details and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case "technical":
        return "badge-tech";
      case "cultural":
        return "badge-cultural";
      case "sports":
        return "badge-sports";
      case "workshop":
        return "badge-workshop";
      default:
        return "badge-other";
    }
  };

  if (loading) {
    return (
      <div className="event-detail-page">
        <div className="detail-loading-skeleton">
          <div className="skeleton-line skeleton-badge"></div>
          <div className="skeleton-line skeleton-title-large"></div>
          <div className="skeleton-line skeleton-meta-bar"></div>
          <div className="detail-grid-skeleton">
            <div className="skeleton-card skeleton-card-large"></div>
            <div className="skeleton-card"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError && !event) {
    return (
      <div className="event-detail-page">
        <div className="error-state-box">
          <div className="error-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2>Event Not Found</h2>
          <p>{message || "The requested event could not be found or loaded."}</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            ← Back to All Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDateFull = eventDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTimeFull = eventDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="event-detail-page">
      {/* Breadcrumb Navigation */}
      <div className="detail-nav-bar">
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate(-1)}
          aria-label="Back to previous page"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Events</span>
        </button>
      </div>

      {/* Top Header Banner */}
      <header className="event-detail-header">
        <div className="header-badge-row">
          <span className={`category-badge ${getCategoryClass(event.category)}`}>
            {event.category || "General"}
          </span>
          <span className="header-status-pill">
            <span className="live-dot"></span>
            Registrations Open
          </span>
        </div>

        <h1 className="event-detail-title">{event.title}</h1>

        <div className="event-header-meta">
          <div className="header-meta-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{formattedDateFull} • {formattedTimeFull}</span>
          </div>

          <div className="header-meta-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{event.venue}</span>
          </div>

          <div className="header-meta-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Organized by {event.organizer || "College Admin"}</span>
          </div>

          <div className="header-meta-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Capacity: {event.capacity} seats</span>
          </div>
        </div>
      </header>

      {/* Two-Column Layout */}
      <div className="event-detail-grid">
        {/* LEFT COLUMN: Event Description & Information */}
        <div className="detail-main-content">
          {/* About Section */}
          <section className="detail-card">
            <h2 className="detail-section-title">About the Event</h2>
            <div className="event-description-full">
              {event.description.split("\n").map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </section>

          {/* Key Event Facts */}
          <section className="detail-card">
            <h2 className="detail-section-title">Event Overview & Schedule</h2>
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-label">Event Date</span>
                <span className="fact-value">{formattedDateFull}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Scheduled Time</span>
                <span className="fact-value">{formattedTimeFull}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Campus Venue</span>
                <span className="fact-value">{event.venue}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Host / Organizer</span>
                <span className="fact-value">{event.organizer || "College Administration"}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Event Category</span>
                <span className="fact-value">{event.category}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Total Capacity</span>
                <span className="fact-value">{event.capacity} Seats Available</span>
              </div>
            </div>
          </section>

          {/* Attendee Instructions */}
          <section className="detail-card instructions-card">
            <h3 className="instructions-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Important Attendee Guidelines
            </h3>
            <ul className="instructions-list">
              <li>Please carry your valid College Student ID card to the venue for verification.</li>
              <li>Please report to the venue at least 15 minutes prior to the start time.</li>
              <li>Registration is free and confirmed instantly upon form submission.</li>
              <li>For team events or workshops requiring laptops, please bring required equipment charged.</li>
            </ul>
          </section>
        </div>

        {/* RIGHT COLUMN: Registration Card */}
        <aside className="detail-sidebar">
          <div className="registration-card">
            <div className="reg-card-header">
              <h3 className="reg-card-title">Reserve Your Spot</h3>
              <p className="reg-card-subtitle">
                Enter your details to confirm your attendance.
              </p>
            </div>

            {isSuccess ? (
              <div className="reg-success-box" role="alert">
                <div className="success-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h4 className="success-title">Registration Successful!</h4>
                <p className="success-desc">
                  {message || "You've successfully registered for this event."}
                </p>
                <div className="success-actions">
                  <button
                    type="button"
                    className="btn btn-outline btn-block"
                    onClick={() => {
                      setIsSuccess(false);
                      setMessage("");
                    }}
                  >
                    Register Another Student
                  </button>
                  <Link to="/" className="btn btn-primary btn-block">
                    Explore More Events
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reg-form" noValidate>
                {isError && (
                  <div className="form-error-alert" role="alert">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{message}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="studentName" className="form-label">
                    Student Name <span className="required-mark">*</span>
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    name="name"
                    placeholder="e.g. Alex Morgan"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="studentEmail" className="form-label">
                    Email Address <span className="required-mark">*</span>
                  </label>
                  <input
                    id="studentEmail"
                    type="email"
                    name="email"
                    placeholder="e.g. alex@college.edu"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rollNumber" className="form-label">
                    Roll Number / Student ID <span className="required-mark">*</span>
                  </label>
                  <input
                    id="rollNumber"
                    type="text"
                    name="rollNumber"
                    placeholder="e.g. 2024-CS-089"
                    value={form.rollNumber}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department" className="form-label">
                    Department <span className="optional-tag">(Optional)</span>
                  </label>
                  <input
                    id="department"
                    type="text"
                    name="department"
                    placeholder="e.g. Computer Science & Eng."
                    value={form.department}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="btn-loading-content">
                      <span className="btn-spinner"></span>
                      Registering...
                    </span>
                  ) : (
                    <span>Register for Event</span>
                  )}
                </button>

                <p className="reg-terms-hint">
                  Instant confirmation • No charges applicable
                </p>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EventDetail;
