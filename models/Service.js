const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    features: [
      {
        type: String,
        maxlength: [200, "Feature cannot be more than 200 characters"],
      },
    ],
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Web Development",
        "Graphic Design",
        "SEO",
        "Digital Marketing",
        "Tech Solutions",
        "Other",
      ],
      default: "Other",
    },
    icon: {
      type: String,
      default: "code",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
