import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";

// @desc    Create a new board
// @route   POST /api/workspaces/:id/boards
// @access  Private
const createBoard = asyncHandler(async (request, response) => {
  const { name, description } = request.body;
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;

  // Check if the user has access to the workspace
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    response.status(404);
    throw new Error("Workspace not found");
  }

  if (
    workspace.creator.toString() !== currentUserId.toString() &&
    !workspace.members.includes(currentUserId)
  ) {
    response.status(403);
    throw new Error("Unauthorized access to this workspace");
  }

  // Check if a board with the same name exists in the workspace
  const boardExists = workspace.boards.find((board) => board.name === name);

  if (boardExists) {
    response.status(400);
    throw new Error("Board with this name already exists in the workspace");
  }

  workspace.boards.push({ name: name, description: description });
  const updatedWorkspace = await workspace.save();

  response.status(201).json({
    _id: workspace.boards[workspace.boards.length - 1].id,
    name: workspace.boards[workspace.boards.length - 1].name,
    description: workspace.boards[workspace.boards.length - 1].description,
  });
});

// @desc    Edit a board
// @route   PUT /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const editBoard = asyncHandler(async (request, response) => {
  const { name, description } = request.body;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const currentUserId = request.user._id;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);

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

  // Find the board to edit
  const boardToEdit = workspace.boards.id(boardId);

  if (!boardToEdit) {
    response.status(404);
    throw new Error("Board not found");
  }

  // Check if a board with the same name already exists in the workspace
  const boardWithSameName = workspace.boards.find(
    (board) => board.name === name && board._id.toString() !== boardId,
  );

  if (boardWithSameName) {
    response.status(400);
    throw new Error("Board with this name already exists in the workspace");
  }

  // Update the board's information
  boardToEdit.name = name || boardToEdit.name;
  boardToEdit.description = description || boardToEdit.description;

  // Save the updated workspace
  const updatedWorkspace = await workspace.save();

  response.status(200).json({
    _id: boardToEdit._id,
    name: boardToEdit.name,
    description: boardToEdit.description,
  });
});

// @desc    Delete a board
// @route   DELETE /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const deleteBoard = asyncHandler(async (request, response) => {
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const currentUserId = request.user._id;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);

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

  // Find the board to delete
  const board = workspace.boards.id(boardId);

  if (!board) {
    response.status(404);
    throw new Error("Board not found");
  }

  // Delete the board using the _id of the board
  await Workspace.updateOne(
    { _id: workspaceId },
    { $pull: { boards: { _id: boardId } } },
  );

  // Save the updated workspace without the deleted board
  response.status(200).json({ message: "Board deleted successfully" });
});

// @desc    Get a workspace's board
// @route   GET /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const getBoard = asyncHandler(async (request, response) => {
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const currentUserId = request.user._id;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);

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

  // Find the board to get
  const boardToGet = workspace.boards.id(boardId);

  if (!boardToGet) {
    response.status(404);
    throw new Error("Board not found");
  }

  response.status(200).json({
    _id: boardToGet._id,
    name: boardToGet.name,
    description: boardToGet.description,
    columns: boardToGet.columns,
  });
});

// @desc    Get a workspace's boards
// @route   GET /api/workspaces/:workspaceId/boards/
// @access  Private
const getBoards = asyncHandler(async (request, response) => {
  // To-do
});

export { createBoard, deleteBoard, editBoard, getBoard, getBoards };
