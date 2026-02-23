import { isAuth } from "../middleware/isAuth.js";
import express from "express";
import {
  deleteScholarship,
  getAllScholarships,
  getMyScholarships,
  getSingleScholarship,
  postScholarship,
} from "../controller/ScholarshipsController.js";

const router = express.Router();

router.get("/getAllScolarships", isAuth, getAllScholarships);
router.post("/postScholarship", isAuth, postScholarship);
router.get("/myScholarships", isAuth, getMyScholarships);
router.delete("/delete/:id", isAuth, deleteScholarship);
router.get("/:id", isAuth, getSingleScholarship);

export default router;
