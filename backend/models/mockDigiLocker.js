import mongoose from "mongoose";

const mockDigiSchema = new mongoose.Schema(
  {
    // Aadhaar number (used to fetch documents)
    aadhaar: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // List of issued documents
    issued: [
      {
        // Document display name
        name: {
          type: String,
          required: true,
        },

        // Public or cloud URL of PDF
        url: {
          type: String,
          required: true,
        },

        // Document type identifier
        doctype: {
          type: String,
          required: true,
          enum: [
            "MARKSHEET_10",
            "MARKSHEET_12",
            "CASTE_CERT",
            "INCOME_CERT",
            "AADHAAR",
            "PAN",
            "OTHER",
          ],
        },
      },
    ],
  },
  { timestamps: true },
);

/*
  Ensures one Aadhaar number
  has only one DigiLocker record
*/
mockDigiSchema.index({ aadhaar: 1 }, { unique: true });

export const MockDigiLocker = mongoose.model("DigiUser", mockDigiSchema);
