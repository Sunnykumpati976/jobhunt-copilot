// backend/src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// load .env
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port for frontend
    credentials: true,
  })
);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "JobHunt Copilot API running" });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
