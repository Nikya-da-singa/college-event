require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const eventRoutes = require("./routes/events");
const registrationRoutes = require("./routes/registrations");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "College Event Management API is running.",
  });
});

app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
