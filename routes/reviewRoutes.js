const express = require("express");
const Review = require("../models/Review");
const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Get all approved reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create review
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { rating, comment, service } = req.body;

    const existingReview = await Review.findOne({ user: req.user.userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already submitted a review" });
    }

    const review = new Review({
      user: req.user.userId,
      rating,
      comment,
      service,
    });
    await review.save();
    await review.populate("user", "name");

    res.status(201).json({ message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get current user's reviews
router.get("/my-reviews", authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.userId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Approve review (admin only)
router.put(
  "/:id/approve",
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
      ).populate("user", "name");

      if (!review) return res.status(404).json({ message: "Review not found" });

      res.json({ message: "Review approved", review });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
