import express from "express";
import {
  authUser,
  deleteUser,
  editUserProfile,
  getUserProfile,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
//import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.route("/:id").delete(deleteUser);
//router.route("/profile").get(protect, getUserProfile).put(getUserProfile)
router.route("/profile").get(getUserProfile);
router.route("/:id").put(editUserProfile);

export default router;
