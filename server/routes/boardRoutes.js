import express from 'express';
import {
  createBoard,
  deleteBoard,
  editBoard,
  getBoard,
  getBoards,
} from '../controllers/boardController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getBoards).post(protect, createBoard).delete(protect, deleteBoard);

export default router;
