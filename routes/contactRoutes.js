const express = require("express");
const Contact = require("../models/Contact");
const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message, serviceType } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      serviceType,
    });
    await contact.save();

    res.status(201).json({ message: "Contact form submitted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all contact submissions (admin only)
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
