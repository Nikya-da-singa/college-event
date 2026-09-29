import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createEvent } from "../api/api";

const initialState = {
  title: "",
  description: "",
  category: "Technical",
  venue: "",
  date: "",
  capacity: 100,
  organizer: "",
};

function AdminAddEvent() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]:
        e.target.name === "capacity"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      setIsError(false);
      setIsSuccess(false);

      await createEvent(form);

      setIsSuccess(true);
      setMessage("Event created successfully! Redirecting to events...");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          "Failed to create event. Please verify all required fields and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Navigation & Header */}
      <div className="admin-header-nav">
        <Link to="/" className="btn-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Events</span>
        </Link>
      </div>

      <div className="admin-form-header">
        <span className="section-badge">Event Dashboard</span>
        <h1 className="admin-form-title">Create a New Event</h1>
        <p className="admin-form-subtitle">
          Bring your next campus experience to life.
        </p>
      </div>

      {isSuccess && (
        <div className="form-success-banner" role="alert">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>{message}</span>
        </div>
      )}

      {isError && (
        <div className="form-error-alert" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-event-form">
        {/* Section 1: Event Information */}
        <div className="admin-form-card">
          <div className="card-section-header">
            <div className="section-step-badge">1</div>
            <div>
              <h2 className="card-section-title">Event Information</h2>
              <p className="card-section-subtitle">
                Basic details and description about the campus event
              </p>
            </div>
          </div>

          <div className="form-row-two-col">
            <div className="form-group span-2">
              <label htmlFor="eventTitle" className="form-label">
                Event Title <span className="required-mark">*</span>
              </label>
              <input
                id="eventTitle"
                type="text"
                name="title"
                placeholder="e.g. Annual Inter-College Hackathon 2026"
                value={form.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group span-2">
              <label htmlFor="eventCategory" className="form-label">
                Category <span className="required-mark">*</span>
              </label>
              <select
                id="eventCategory"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Workshop">Workshop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group span-2">
              <label htmlFor="eventDescription" className="form-label">
                Description <span className="required-mark">*</span>
              </label>
              <textarea
                id="eventDescription"
                name="description"
                placeholder="Provide a comprehensive description of the event, eligibility, agenda, and benefits..."
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="form-textarea"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Date & Venue */}
        <div className="admin-form-card">
          <div className="card-section-header">
            <div className="section-step-badge">2</div>
            <div>
              <h2 className="card-section-title">Date & Venue</h2>
              <p className="card-section-subtitle">
                When and where the event will take place
              </p>
            </div>
          </div>

          <div className="form-row-two-col">
            <div className="form-group">
              <label htmlFor="eventDate" className="form-label">
                Date & Time <span className="required-mark">*</span>
              </label>
              <input
                id="eventDate"
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventVenue" className="form-label">
                Venue / Location <span className="required-mark">*</span>
              </label>
              <input
                id="eventVenue"
                type="text"
                name="venue"
                placeholder="e.g. Main Auditorium, Block C"
                value={form.venue}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Capacity & Organizer */}
        <div className="admin-form-card">
          <div className="card-section-header">
            <div className="section-step-badge">3</div>
            <div>
              <h2 className="card-section-title">Capacity & Organizer</h2>
              <p className="card-section-subtitle">
                Seat limits and hosting department or club details
              </p>
            </div>
          </div>

          <div className="form-row-two-col">
            <div className="form-group">
              <label htmlFor="eventCapacity" className="form-label">
                Max Capacity (Seats) <span className="required-mark">*</span>
              </label>
              <input
                id="eventCapacity"
                type="number"
                name="capacity"
                placeholder="100"
                value={form.capacity}
                onChange={handleChange}
                min="1"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventOrganizer" className="form-label">
                Organizer / Department <span className="optional-tag">(Optional)</span>
              </label>
              <input
                id="eventOrganizer"
                type="text"
                name="organizer"
                placeholder="e.g. Coding Club / CSE Dept."
                value={form.organizer}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Form Submission Actions */}
        <div className="admin-form-actions">
          <Link to="/" className="btn btn-outline btn-lg">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={submitting}
          >
            {submitting ? (
              <span className="btn-loading-content">
                <span className="btn-spinner"></span>
                Creating Event...
              </span>
            ) : (
              <span>Create Event</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAddEvent;
