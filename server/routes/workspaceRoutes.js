import express from "express";
import {
  createWorkspace,
  deleteWorkspace,
  shareWorkspace,
} from "../controllers/workspaceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createWorkspace);
router.route("/:id").delete(protect, deleteWorkspace);
router.route("/:id/share").put(protect, shareWorkspace);

export default router;
