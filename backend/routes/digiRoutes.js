import express from "express";
import { uploadFiles } from "../middleware/multer.js";
import { addDigiUser } from "../controller/digiController.js";

const router = express.Router();

router.post(
  "/digiusers",
  uploadFiles, // multer.array("documents")
  addDigiUser,
);
export default router;
