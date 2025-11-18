// backend/src/routes/authRoutes.js
const express = require("express");
const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // TODO: add DB + password hashing
  console.log("Register:", { name, email });

  return res.status(201).json({
    message: "User registration placeholder. DB logic to be added later.",
  });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // TODO: check user in DB and create real JWT
  console.log("Login:", { email });

  return res.json({
    message: "Login placeholder. Auth logic to be added later.",
    token: "fake-jwt-token",
  });
});

module.exports = router;
