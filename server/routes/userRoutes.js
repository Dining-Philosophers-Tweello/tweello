import express from "express";
import {
  authUser,
  deleteUser,
  editUserProfile,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/:id").delete(deleteUser);
//TODO: Add get(getUserProfile). before .put on below line once getUserProfile implemented
router.route("/:id").put(editUserProfile);

export default router;
