const express = require("express");
const {
  registerForEvent,
  getRegistrationsForEvent,
  getRegistrationsForStudent,
} = require("../controllers/registrationController");

const router = express.Router();

router.post("/", registerForEvent);
router.get("/event/:eventId", getRegistrationsForEvent);
router.get("/student/:email", getRegistrationsForStudent);

module.exports = router;
