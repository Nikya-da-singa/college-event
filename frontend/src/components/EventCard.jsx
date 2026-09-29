import { Link } from "react-router-dom";

function EventCard({ event }) {
  const eventDate = new Date(event.date);
  
  const formattedDate = eventDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

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

  return (
    <article className="event-card">
      <div className="event-card-header">
        <span className={`category-badge ${getCategoryClass(event.category)}`}>
          {event.category || "General"}
        </span>
        <span className="event-capacity-tag" title="Total Capacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {event.capacity} seats
        </span>
      </div>

      <div className="event-card-body">
        <h3 className="event-title" title={event.title}>
          {event.title}
        </h3>

        <p className="event-description">
          {event.description}
        </p>

        <div className="event-meta-list">
          <div className="meta-item">
            <svg className="meta-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="meta-text">{formattedDate} • {formattedTime}</span>
          </div>

          <div className="meta-item">
            <svg className="meta-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="meta-text venue-text" title={event.venue}>{event.venue}</span>
          </div>

          {event.organizer && (
            <div className="meta-item organizer-meta">
              <svg className="meta-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="meta-text">By {event.organizer}</span>
            </div>
          )}
        </div>
      </div>

      <div className="event-card-footer">
        <Link to={`/events/${event._id}`} className="btn btn-card-details">
          <span>View Details</span>
          <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
