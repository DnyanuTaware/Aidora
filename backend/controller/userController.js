import { User } from "../models/userModel.js";
import TryCatch from "../utils/TryCatch.js";
import { StudentProfile } from "../models/studentProfileModel.js";

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

export const createOrUpdateProfile = TryCatch(async (req, res) => {
  const userId = req.user._id; // From isAuth middleware
  const profileData = req.body;

  // Check if a profile already exists for this user
  let existingProfile = await StudentProfile.findOne({ userId });

  if (existingProfile) {
    // 🔁 Update existing profile
    existingProfile = await StudentProfile.findOneAndUpdate(
      { userId },
      { $set: profileData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: existingProfile,
    });
  }

  // 🆕 Create a new profile
  const newProfile = await StudentProfile.create({
    userId,
    ...profileData,
  });

  res.status(201).json({
    success: true,
    message: "Profile created successfully",
    profile: newProfile,
  });
});

// ✅ Fetch student profile by userId
export const fetchStudentProfile = TryCatch(async (req, res) => {
  const { userId } = req.params;

  const profile = await StudentProfile.findOne({ userId });

  if (!profile) {
    return res.status(404).json({
      success: false,
      message: "Profile not found",
    });
  }

  res.status(200).json({
    success: true,
    profile,
  });
});
