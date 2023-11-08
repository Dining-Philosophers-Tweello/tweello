import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";

// @desc    Create a new column
// @route   POST /api/workspaces/:workspaceId/boards/:boardId/columns
// @access  Private
const createColumn = asyncHandler(async (request, response) => {
  const { name } = request.body;
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;

  // Check if the workspace exists
  let workspace;
  try {
    workspace = await Workspace.findById(workspaceId);
  } catch (error) {
    response.status(404);
    throw new Error("Workspace not found");
  }
  // Check against old deleted workspace IDs
  if (!workspace) {
    response.status(404);
    throw new Error("Workspace not found");
  }

  // Check if the user has access to the workspace
  if (
    workspace.creator.toString() !== currentUserId.toString() &&
    !workspace.members.includes(currentUserId)
  ) {
    response.status(403);
    throw new Error("Unauthorized access to this workspace");
  }

  // Find the board
  const board = workspace.boards.id(boardId);

  // Check if the board exists
  if (!board) {
    response.status(404);
    throw new Error("Board not found");
  }

  // Check if a column with the same name already exists in the board
  const columnExists = board.columns.find((column) => column.name === name);

  if (columnExists) {
    response.status(400);
    throw new Error("Column with this name already exists in the board");
  }

  board.columns.push({ name: name });
  // Must save the parent doc, not the subdoc!
  const updatedWorkspce = await workspace.save();

  response.status(201).json({
    _id: board.columns[board.columns.length - 1].id,
    name: board.columns[board.columns.length - 1].name,
  });
});

// @desc    Edit a column
// @route   PUT /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId
// @access  Private
const editColumn = asyncHandler(async (request, response) => {});

// @desc    Delete a column
// @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId
// @access  Private
const deleteColumn = asyncHandler(async (request, response) => {});

// @desc    Get a board's column
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId
// @access  Private
const getColumn = asyncHandler(async (request, response) => {});

// @desc    Get a board's columns
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns
// @access  Private
const getColumns = asyncHandler(async (request, response) => {
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;

  // Check if the workspace exists
  let workspace;
  try {
    workspace = await Workspace.findById(workspaceId);
  } catch (error) {
    response.status(404);
    throw new Error("Workspace not found");
  }
  // Check against old deleted workspace IDs
  if (!workspace) {
    response.status(404);
    throw new Error("Workspace not found");
  }

  // Check if the user has access to the workspace
  if (
    workspace.creator.toString() !== currentUserId.toString() &&
    !workspace.members.includes(currentUserId)
  ) {
    response.status(403);
    throw new Error("Unauthorized access to this workspace");
  }

  // Find the board
  const board = workspace.boards.id(boardId);

  // Check if the board exists
  if (!board) {
    response.status(404);
    throw new Error("Board not found");
  }

  response.status(200).json({
    columns: board.columns,
  });
});

export { createColumn, deleteColumn, editColumn, getColumn, getColumns };
