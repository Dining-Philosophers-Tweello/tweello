// controllers/boardController.js
import asyncHandler from 'express-async-handler';
import Board from '../models/boardModel.js';

// @desc    Create a new board
// @route   POST /api/workspaces/:workspaceId/boards
// @access  Private
const createBoard = asyncHandler(async (request, response) => {
  const { name } = request.body;
  const creator = request.user._id;
  const workspaceId = request.params.workspaceId;

  // Check if the user has access to the workspace
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    response.status(404);
    throw new Error("Workspace not found");
  }

  if (workspace.creator.toString() !== request.user._id.toString() && !workspace.members.includes(request.user._id)) {
    response.status(403);
    throw new Error("Unauthorized access to this workspace");
  }

  // Check if a board with the same name exists in the workspace
  const boardExists = await Board.findOne({ name, workspace: workspaceId });

  if (boardExists) {
    response.status(400);
    throw new Error("Board with this name already exists in the workspace");
  }

  // Create a new board in the workspace
  const board = await Board.create({ name, creator, workspace: workspaceId });

  if (board) {
    response.status(201).json({
      _boardId: board._id,
      name: board.name,
      creator: board.creator,
      workspace: board.workspace,
    });
  } else {
    response.status(400);
    throw new Error("Invalid request");
  }
});

// @desc    Edit a board
// @route   PUT /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const editBoard = asyncHandler(async (request, response) => {
    // To-do
 });

// @desc    Delete a board
// @route   DELETE /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const deleteBoard = asyncHandler(async (request, response) => {
    // To-do
 });

// @desc    Get a workspace's boards
// @route   GET /api/workspaces/:workspaceId/boards/
// @access  Private
const getBoards = asyncHandler(async (request, response) => {
  // To-do
});

// @desc    Get a workspace's board
// @route   GET /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const getBoard = asyncHandler(async (request, response) => {
   // To-do
});

export { createBoard, deleteBoard, editBoard, getBoard, getBoards };
