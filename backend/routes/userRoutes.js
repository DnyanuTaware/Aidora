import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { myProfile } from "../controller/userController.js";

const router = express.Router();
router.get("/me", isAuth, myProfile);

export default router;
