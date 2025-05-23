const express = require("express");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Update profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, phone, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone, bio },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
