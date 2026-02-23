import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  createOrUpdateProfile,
  fetchStudentProfile,
  myProfile,
} from "../controller/userController.js";

const router = express.Router();
router.get("/me", isAuth, myProfile);

router.post("/studentProfile/createOrUpdate", isAuth, createOrUpdateProfile);
router.get("/studentProfile/:userId", isAuth, fetchStudentProfile);

export default router;
