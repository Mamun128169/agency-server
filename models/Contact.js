const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [15, "Phone number cannot be more than 15 characters"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject cannot be more than 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
    serviceType: {
      type: String,
      enum: [
        "Web Development",
        "Graphic Design",
        "SEO",
        "Digital Marketing",
        "Tech Solutions",
        "General Inquiry",
      ],
      default: "General Inquiry",
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
