import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";

// @desc    Create a new column
// @route   POST /api/workspaces/:workspaceId/boards/:boardId/columns
// @access  Private
const createColumn = asyncHandler(async (request, response) => {

});

// @desc    Edit a column
// @route   PUT /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId
// @access  Private
const editColumn = asyncHandler(async (request, response) => {

});


// @desc    Delete a column
// @route   DELETE /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId
// @access  Private
const deleteColumn = asyncHandler(async (request, response) => {

});

// @desc    Get a board's column
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns/:columnId
// @access  Private
const getColumn = asyncHandler(async (request, response) => {

});

// @desc    Get a board's columns
// @route   GET /api/workspaces/:workspaceId/boards/:boardId/columns
// @access  Private
const getColumns = asyncHandler(async (request, response) => {

});

export { createColumn, editColumn, deleteColumn, getColumn, getColumns };
