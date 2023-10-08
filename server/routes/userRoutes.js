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
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(getUserProfile)
  .put(editUserProfile)
  .delete(deleteUser);

export default router;
