import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";

// @desc    Create a new task
// @route   POST /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks
// @access  Private
const createTask = asyncHandler(async (request, response) => {
  const { name, description } = request.body;
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const columnId = request.params.columnId;

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

  // Find the column
  const column = board.columns.id(columnId);

  // Check if the column exists
  if (!column) {
    response.status(404);
    throw new Error("Column not found");
  }

  column.tasks.push({ name: name, description: description });
  // Must save the parent doc, not the subdoc!
  const updatedWorkspace = await workspace.save();

  response.status(201).json({
    _id: column.tasks[column.tasks.length - 1].id,
    name: column.tasks[column.tasks.length - 1].name,
    description: column.tasks[column.tasks.length - 1].description,
  });
});

// @desc    Edit a task
// @route   PUT /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks/:taskId
// @access  Private
const editTask = asyncHandler(async (request, response) => {
  const { name, description } = request.body;
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const columnId = request.params.columnId;
  const taskId = request.params.taskId;

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

  // Find the column
  const column = board.columns.id(columnId);

  // Check if the column exists
  if (!column) {
    response.status(404);
    throw new Error("Column not found");
  }

  const taskToEdit = column.tasks.id(taskId);

  if (!taskToEdit) {
    response.status(404);
    throw new Error("Task not found");
  }

  taskToEdit.name = name || taskToEdit.name;
  taskToEdit.description = description || taskToEdit.description;

  await workspace.save();

  response.status(200).json({
    _id: taskToEdit._id,
    name: taskToEdit.name,
    description: taskToEdit.description,
  });
});

// @desc    Delete a task
// @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async (request, response) => {
  const name = request.body;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const columnId = request.params.columnId;
  const taskId = request.params.taskId;
  const currentUserId = request.user._id;

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

  // Find the column 
  const columnToDelete = board.columns.id(columnId);

  // Check if the column exists
  if (!columnToDelete) {
    response.status(404);
    throw new Error("Column not found");
  }

  // Find the task 
  const taskToDelete = board.columns.id(columnId);

  // Check if the task exists
  if (!taskToDelete) {
    response.status(404);
    throw new Error("Column not found");
  }

  // Delete the task using the _id of the task within a specific column
  await Workspace.updateOne(
    { _id: workspaceId, "boards._id": boardId },
    { $pull: { "boards.$.columns.$[col].tasks": { _id: taskId } } },
    { arrayFilters: [{ "col._id": columnId }] }
  );

  // Save the updated board without the deleted task
  response.status(200).json({ message: "Task deleted successfully" });
});

// @desc    Get a column's task
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks/:taskId
// @access  Private
const getTask = asyncHandler(async (request, response) => {
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const columnId = request.params.columnId;
  const taskId = request.params.taskId;

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

  // Find the column
  const column = board.columns.id(columnId);

  // Check if the column exists
  if (!column) {
    response.status(404);
    throw new Error("Column not found");
  }

  // Find the task
  const task = column.tasks.id(taskId);

  // Check if the task exists
  if (!task) {
    response.status(404);
    throw new Error("Task not found");
  }

  response.status(200).json({
    _id: task._id,
    name: task.name,
    description: task.description,
  });
});

// @desc    Get a column's tasks
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks
// @access  Private
const getTasks = asyncHandler(async (request, response) => {
  const currentUserId = request.user._id;
  const workspaceId = request.params.workspaceId;
  const boardId = request.params.boardId;
  const columnId = request.params.columnId;

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

  // Find the column
  const column = board.columns.id(columnId);

  // Check if the column exists
  if (!column) {
    response.status(404);
    throw new Error("Column not found");
  }

  response.status(200).json({
    tasks: column.tasks,
  });
});

export { createTask, deleteTask, editTask, getTask, getTasks };
