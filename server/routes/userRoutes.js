import express from "express";
import {
  authUser,
  deleteUser,
  editUserProfile,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUsers).post(registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, editUserProfile)
  .delete(protect, deleteUser);

export default router;
