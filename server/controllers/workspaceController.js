import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";
import User from "../models/userModel.js";

// @desc    Create a new workspace
// @route   POST /api/workspaces
// @access  Public
const createWorkspace = asyncHandler(async (request, response) => {
  const { name } = request.body;
  const creator = request.user._id;

  const workspaceExists = await Workspace.findOne({ name });

  if (workspaceExists) {
    response.status(400);
    throw new Error("You already have a workspace with this name");
  }

  const workspace = await Workspace.create({ name, creator });

  if (workspace) {
    response.status(200).json({
      _id: workspace._id,
      name: workspace.name,
      creator: workspace.creator,
    });
  } else {
    response.status(400);
    throw new Error("Invalid request");
  }

  response.status(200).json({ message: "Success" });
});

export { createWorkspace };
