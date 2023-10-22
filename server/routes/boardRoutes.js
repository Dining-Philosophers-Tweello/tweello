// routes/boardRoutes.js
import express from 'express';
import {
  createBoard,
  deleteBoard,
  editBoard,
  getBoard,
  getBoards,
} from '../controllers/boardController.js';

const router = express.Router();

router.route('/').get(getBoards).post(createBoard);
router.route('/:id').get(getBoard).put(editBoard).delete(deleteBoard);

export default router;
