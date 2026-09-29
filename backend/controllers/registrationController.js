const mongoose = require("mongoose");
const Registration = require("../models/Registration");
const Student = require("../models/Student");
const Event = require("../models/Event");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId, name, email, rollNumber, department } = req.body;

    if (!eventId || !name || !email || !rollNumber) {
      return res.status(400).json({
        message: "eventId, name, email and rollNumber are required",
      });
    }

    if (!isValidId(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existingStudent = await Student.findOne({
      email: normalizedEmail,
    });

    if (existingStudent) {
      const alreadyRegistered = await Registration.findOne({
        event: eventId,
        student: existingStudent._id,
      });

      if (alreadyRegistered) {
        return res.status(409).json({
          message: "You have already registered for this event",
        });
      }
    }

    const currentRegistrations = await Registration.countDocuments({
      event: eventId,
    });

    if (currentRegistrations >= event.capacity) {
      return res.status(400).json({
        message: "This event is already full",
      });
    }

    let student = existingStudent;

    if (!student) {
      student = await Student.create({
        name: name.trim(),
        email: normalizedEmail,
        rollNumber: rollNumber.trim(),
        department: department?.trim() || "",
      });
    }

    const registration = await Registration.create({
      event: eventId,
      student: student._id,
    });

    const populated = await registration.populate(["event", "student"]);

    res.status(201).json(populated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already registered for this event",
      });
    }

    res.status(400).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

exports.getRegistrationsForEvent = async (req, res) => {
  try {
    if (!isValidId(req.params.eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const registrations = await Registration.find({
      event: req.params.eventId,
    })
      .populate("student")
      .populate("event")
      .sort({ registeredAt: 1 });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};

exports.getRegistrationsForStudent = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).trim().toLowerCase();

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const registrations = await Registration.find({
      student: student._id,
    })
      .populate("event")
      .sort({ registeredAt: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};
