const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    phone: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: function (v) {
          return !v || /^[\d+\s().-]{7,}$/.test(v);
        },
        message: "Invalid phone number format"
      }
    },
    email: {
      type: String,
      trim: true,
      default: "",
      lowercase: true,
      validate: {
        validator: function (v) {
          return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format"
      }
    },
    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Company name cannot exceed 100 characters"]
    },
    address: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Address cannot exceed 500 characters"]
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"]
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries
cardSchema.index({ createdAt: -1 });
cardSchema.index({ email: 1 });

module.exports = mongoose.model("Card", cardSchema);
