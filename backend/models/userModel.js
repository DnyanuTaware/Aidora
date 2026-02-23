import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },

    stateDistrict: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
      enum: ["english", "hindi", "marathi", "tamil", "telugu", "gujarati"],
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "organization"],
    },

    profilePic: {
      id: { type: String },
      url: { type: String },
    },
    hasCompletedProfile: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
