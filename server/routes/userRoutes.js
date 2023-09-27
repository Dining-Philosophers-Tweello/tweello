import express from "express";
import {
  authUser,
  deleteUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.delete("/:id", deleteUser);

export default router;
