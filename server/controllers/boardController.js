// controllers/boardController.js
import asyncHandler from 'express-async-handler';
import Board from '../models/boardModel.js';

const createBoard = asyncHandler(async (req, res) => {
    // To-do
 });

const editBoard = asyncHandler(async (req, res) => {
    // To-do
 });
 
const deleteBoard = asyncHandler(async (req, res) => {
    // To-do
 });

const getBoards = asyncHandler(async (req, res) => {
  // To-do
});

const getBoard = asyncHandler(async (req, res) => {
   // To-do
});

export { createBoard, deleteBoard, editBoard, getBoard, getBoards };
