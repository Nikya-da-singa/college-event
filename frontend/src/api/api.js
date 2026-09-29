import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEvents = () => api.get("/events");

export const getEventById = (id) => api.get(`/events/${id}`);

export const createEvent = (eventData) =>
  api.post("/events", eventData);

export const updateEvent = (id, eventData) =>
  api.put(`/events/${id}`, eventData);

export const deleteEvent = (id) =>
  api.delete(`/events/${id}`);

export const registerForEvent = (registrationData) =>
  api.post("/registrations", registrationData);

export const getRegistrationsForEvent = (eventId) =>
  api.get(`/registrations/event/${eventId}`);

export const getRegistrationsForStudent = (email) =>
  api.get(`/registrations/student/${encodeURIComponent(email)}`);

export default api;
