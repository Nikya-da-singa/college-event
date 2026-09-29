const mongoose = require("mongoose");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event",
      error: error.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update event",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Registration.deleteMany({ event: req.params.id });

    res.status(200).json({
      message: "Event and its registrations deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete event",
      error: error.message,
    });
  }
};
