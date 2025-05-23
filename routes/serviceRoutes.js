const express = require("express");
const Service = require("../models/Service");
const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create service (admin only)
router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ message: "Service created", service });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
