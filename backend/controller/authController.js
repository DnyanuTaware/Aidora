import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import getDataURL from "../utils/urlGenerator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = TryCatch(async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password, phone, stateDistrict, language, role } =
    req.body;
  const file = req.file;

  // ✅ Validate all required fields
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !stateDistrict ||
    !language ||
    !role
  ) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  // ✅ Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  // ✅ Hash password
  const hashedPWD = await bcrypt.hash(password, 10);

  // ✅ Upload image to Cloudinary
  if (!file) {
    return res.status(400).json({ message: "Profile image is required" });
  }
  const fileURL = await getDataURL(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileURL.content, {
    folder: "aidora_profiles",
  });

  // ✅ Create new user
  user = await User.create({
    name,
    email,
    password: hashedPWD,
    phone,
    stateDistrict,
    language,
    role,
    profilePic: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // ✅ Generate JWT Token
  generateToken(user._id, res);

  // ✅ Send response
  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const comparepassword = await bcrypt.compare(password, user.password);

  if (!comparepassword) {
    return res.status(400).json({
      message: "Invalid Cedentials",
    });
  }

  generateToken(user._id, res);
  res.json({
    message: "User Logged in",
    user,
  });
});

export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { message: 0 });
  res.json({
    message: "loged out successfully",
  });
});
