const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: ["Technical", "Cultural", "Sports", "Workshop", "Other"],
      default: "Other",
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
      default: 100,
    },
    organizer: {
      type: String,
      trim: true,
      default: "College Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
