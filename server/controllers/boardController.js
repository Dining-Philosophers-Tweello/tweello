import asyncHandler from 'express-async-handler';
import Workspace from "../models/workspaceModel.js";

// @desc    Create a new board
// @route   POST /api/workspaces/:id/boards
// @access  Private
const createBoard = asyncHandler(async (request, response) => {
  const { name, description } = request.body;
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;
  
  console.log(request.params.workspaceId);

  // Check if the user has access to the workspace
  const workspace = await Workspace.findById(workspaceId);
  console.log(workspace);

  if (!workspace) {
    response.status(404);
    throw new Error("Workspace not found");
  }

  if (workspace.creator.toString() !== currentUserId.toString() && !workspace.members.includes(currentUserId)) {
    response.status(403);
    throw new Error("Unauthorized access to this workspace");
  }

  // Check if a board with the same name exists in the workspace
  const boardExists = workspace.boards.find(board => board.name === name);

  if (boardExists) {
    response.status(400);
    throw new Error("Board with this name already exists in the workspace");
  }

  workspace.boards.push({ name:name, description:description }); 
  const updatedWorkspace = await workspace.save();


    response.status(201).json({
      _id: workspace.boards[workspace.boards.length - 1].id,
      name: workspace.boards[workspace.boards.length - 1].name,
      description: workspace.boards[workspace.boards.length - 1].description
    });
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
