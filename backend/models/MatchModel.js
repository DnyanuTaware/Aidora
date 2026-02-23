import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    // Reference to Student Profile
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },

    // Reference to Scholarship
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },

    // AI Matching Score (0–100)
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // Explanation for transparency
    matchReason: {
      type: String,
    },

    // Optional: status tracking
    applicationStatus: {
      type: String,
      enum: ["Recommended", "Applied", "Rejected", "Approved"],
      default: "Recommended",
    },

    // Optional: ranking position
    rank: {
      type: Number,
    },
  },
  { timestamps: true },
);

/*
  Prevent duplicate entries:
  One student should not have multiple
  match records for same scholarship
*/
matchSchema.index({ studentProfileId: 1, scholarshipId: 1 }, { unique: true });

export const Match = mongoose.model("Match", matchSchema);
