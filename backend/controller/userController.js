import { User } from "../models/userModel.js";
import TryCatch from "../utils/TryCatch.js";

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});
