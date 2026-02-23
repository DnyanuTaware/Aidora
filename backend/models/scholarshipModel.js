import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    provider: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Eligibility section
    eligibility: {
      minMarks: { type: Number, default: 0 },
      maxAnnualIncome: { type: Number, default: Infinity },
      category: {
        type: [String],
        enum: ["General", "OBC", "SC", "ST", "EWS", "All"],
        default: ["All"],
      },
      gender: {
        type: [String],
        enum: ["Male", "Female", "Other", "All"],
        default: ["All"],
      },
      state: {
        type: [String],
        default: ["All"], // Scholarships may be for specific states
      },
      educationLevel: {
        type: [String],
        enum: [
          "10th",
          "12th",
          "Diploma",
          "Undergraduate",
          "Postgraduate",
          "PhD",
          "All",
        ],
        default: ["All"],
      },
      religion: {
        type: [String],
        default: ["All"],
      },
      disabilityStatus: {
        type: [String],
        default: ["All"],
      },
    },

    // Application details
    applicationLink: {
      type: String,
      required: true,
    },
    lastDateToApply: {
      type: Date,
      required: true,
    },
    documentsRequired: {
      type: [String],
      default: [],
    },

    // For AI-based ranking or admin curation
    tags: [String],
    verified: {
      type: Boolean,
      default: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // must be linked to logged-in organization
    },
  },
  { timestamps: true }
);

export const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
