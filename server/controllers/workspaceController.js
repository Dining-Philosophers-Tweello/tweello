import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Create a new workspace
// @route   POST /api/workspaces
// @access  Public
const createWorkspace = asyncHandler(async (request, response) => {
  const { name, boards, members, creator } = request.body;

  const workspaceExists = await Workspace.findOne({ name });

  if (workspaceExists) {
    response.status(400);
    throw new Error("You already have a workspace with this name");
  }

  const workspace = await Workspace.create({ name, boards, members, creator });

  if (workspace) {
    generateToken(response, workspace._id);
    response.status(200).json({
      _id: workspace._id,
      name: workspace.name,
      boards: workspace.boards,
      members: workspace.members,
      creator: workspace.creator,
    });
  } else {
    response.status(400);
    throw new Error("Invalid request");
  }

  response.status(200).json({ message: "Success" });
});

export { createWorkspace };
