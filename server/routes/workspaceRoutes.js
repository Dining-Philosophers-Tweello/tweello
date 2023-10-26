import express from "express";
import { createBoard, deleteBoard, editBoard, getBoard, getBoards } from "../controllers/boardController.js";
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

// Board Routes
router.route("/:workspaceId/boards").get(protect, getBoards).post(protect, createBoard);
router.route('/:workspaceId/boards/:boardId')
  .put(protect, editBoard)
  .delete(protect, deleteBoard)
  .get(protect, getBoard);

export default router;
