import express from "express";
import {
  authUser,
  editUserProfile,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.route("/profile").get(getUserProfile).put(editUserProfile);

export default router;
