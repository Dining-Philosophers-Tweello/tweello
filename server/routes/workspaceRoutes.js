import express from "express";
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
  getWorkspace,
  getWorkspaces,
} from "../controllers/workspaceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getWorkspaces).post(protect, createWorkspace);
router
  .route("/:workspaceId")
  .get(protect, getWorkspace)
  .put(protect, editWorkspace)
  .delete(protect, deleteWorkspace);

export default router;
