import express from "express";
import { connectDb } from "./database/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

const app = express();
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_CLOUD_NAME,

  api_key: process.env.Cloudinary_API,

  api_secret: process.env.Cloudinary_SECRET,
});

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parse data
app.use(cookieParser());
//using routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/scholarships", scholarshipRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running");
  connectDb();
});
