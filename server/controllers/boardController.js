import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel";

// @desc    Get a board from a workspace
// @route   GET /api/boards/:id
// @access  Private
const getBoard = asyncHandler(async (request, response) => {
  const board = await Board.findById(request.params.id);
  const currentUserId = request.user._id;

  if (!board) {
    response.status(404);
    throw new Error("Board not found");
  }
  //TODO: you'll soon be able to query using both workspace ID and then board ID. wait until Sarah's PR
  const isValidUser = await Board.findOne({
    _id: board._id,
    $or: [{ creator: currentUserId }, { members: { $in: [currentUserId] } }],
  })
    .then((board) => {
      if (board) {
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });

  if (!isValidUser) {
    response.status(401);
    throw new Error("You do not have permission to get this board");
  }

  response.status(200).json({
    _id: board._id,
    name: board.name,
    description: board.description,
    columns: workspace.columns,
  });
});

export {
  getBoard,
};
