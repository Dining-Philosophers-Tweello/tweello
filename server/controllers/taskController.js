import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";

// @desc    Create a new task
// @route   POST /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks
// @access  Private
const createTask = asyncHandler(async (request, response) => {
  // To-do
});

// @desc    Edit a task
// @route   PUT /api/workspaces/:workspaceId/boards/:boardId/tasks/:taskId
// @access  Private
const editTask = asyncHandler(async (request, response) => {
  // To-do
});

// @desc    Delete a task
// @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async (request, response) => {
    // To-do
});

// @desc    Get a board's task
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks/:taskId
// @access  Private
const getTask = asyncHandler(async (request, response) => {
    // To-do
});

// @desc    Get a board's tasks
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks
// @access  Private
const getTasks = asyncHandler(async (request, response) => {
  // To-do
});

export { createTask, deleteTask, editTask, getTask, getTasks };
