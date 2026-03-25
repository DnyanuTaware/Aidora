import TryCatch from "../utils/TryCatch.js";
import { MockDigiLocker } from "../models/mockDigiLocker.js";
import cloudinary from "cloudinary";
import getDataURL from "../utils/urlGenerator.js";

const detectDocType = (filename) => {
  const name = filename.toLowerCase();

  if (name.includes("10")) return "MARKSHEET_10";
  if (name.includes("12")) return "MARKSHEET_12";
  if (name.includes("caste")) return "CASTE_CERT";
  if (name.includes("income")) return "INCOME_CERT";
  if (name.includes("aadhaar")) return "AADHAAR";
  if (name.includes("pan")) return "PAN";

  return "OTHER";
};

export const addDigiUser = TryCatch(async (req, res) => {
  const { aadhaar } = req.body;

  // ✅ Validate Aadhaar
  if (!aadhaar) {
    return res.status(400).json({
      success: false,
      message: "Aadhaar is required",
    });
  }

  // ✅ Check duplicate
  const existingUser = await MockDigiLocker.findOne({ aadhaar });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "DigiUser already exists",
    });
  }

  // ✅ Validate files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one document is required",
    });
  }

  // ✅ Upload each file to Cloudinary
  const uploadedDocs = [];

  for (const file of req.files) {
    const fileURL = getDataURL(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileURL.content, {
      folder: `digilocker/${aadhaar}`,
      resource_type: "raw", // important for PDFs
    });

    uploadedDocs.push({
      name: file.originalname,
      url: myCloud.secure_url,
      public_id: myCloud.public_id,
      doctype: detectDocType(file.originalname),
    });
  }

  // ✅ Create DigiUser
  const digiUser = await MockDigiLocker.create({
    aadhaar,
    issued: uploadedDocs,
  });

  res.status(201).json({
    success: true,
    message: "DigiUser created successfully",
    digiUser,
  });
});
