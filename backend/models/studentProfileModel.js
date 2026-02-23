import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    // Reference to logged-in user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // each user has exactly one profile
    },

    // A. Educational Details
    educationLevel: {
      type: String,
      required: true,
      enum: ["10th", "12th", "Diploma", "Undergraduate", "Postgraduate", "PhD"],
    },
    instituteName: { type: String, required: true },
    courseName: { type: String, required: true },
    currentYear: { type: String, required: true },
    marks: { type: Number, required: true, min: 0, max: 100 },
    boardOrUniversity: { type: String },
    academicGap: { type: Boolean, default: false },

    // B. Demographic Details
    category: {
      type: String,
      required: true,
      enum: ["General", "OBC", "SC", "ST", "EWS"],
    },
    disabilityStatus: { type: String, default: "No" },
    religion: { type: String },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    state: { type: String, required: true },
    district: { type: String, required: true },
    pinCode: { type: String },

    // C. Economic Details
    annualIncome: { type: Number, required: true },
    incomeCertificateNumber: { type: String },
    guardianOccupation: { type: String },
    guardianEducation: { type: String },
    bankAccountLinked: { type: Boolean, default: false },

    // D. Verification / DigiLocker placeholders
    aadhaarVerified: { type: Boolean, default: false },
    incomeCertificateVerified: { type: Boolean, default: false },
    casteCertificateVerified: { type: Boolean, default: false },
    marksheetVerified: { type: Boolean, default: false },

    // Future: AI recommendations, matched scholarships, etc.
    matchedScholarships: [
      {
        scholarshipId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Scholarship",
        },
        matchScore: Number, // For AI-based eligibility ranking
      },
    ],
  },
  { timestamps: true },
);

export const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema,
);
