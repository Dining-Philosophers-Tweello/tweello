// controllers/boardController.js
import asyncHandler from 'express-async-handler';
import Board from '../models/boardModel.js';

// @desc    Create a new board
// @route   POST /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const createBoard = asyncHandler(async (request, res) => {
    // To-do
 });

// @desc    Edit a board
// @route   PUT //api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const editBoard = asyncHandler(async (request, res) => {
    // To-do
 });

// @desc    Delete a board
// @route   DELETE /api/workspaces/:workspaceId/boards/:boardId
// @access  Private
const deleteBoard = asyncHandler(async (request, res) => {
    // To-do
 });

// @desc    Get a workspace's boards
// @route   GET /api/workspaces/:workspaceId/boards/
// @access  Private
const getBoards = asyncHandler(async (request, res) => {
  // To-do
});

// @desc    Get a workspace's board
// @route   GET /api/workspaces/:workspaceId/boards/:id
// @access  Private
const getBoard = asyncHandler(async (request, res) => {
   // To-do
});

export { createBoard, deleteBoard, editBoard, getBoard, getBoards };
