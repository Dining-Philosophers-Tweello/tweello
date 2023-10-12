import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";

// @desc    Create a new workspace
// @route   POST /api/workspaces
// @access  Private
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

// @desc    Delete a workspace
// @route   DELETE /api/workspaces/:id
// @access  Private
const deleteWorkspace = asyncHandler(async (request, response) => {
  const id = request.params.id;
  const user = request.user._id;

  const workspace = await Workspace.findById(id);

  if (!workspace) {
    response.status(404);
    throw new Error("Workspace not found");
  }

  if (workspace.creator.toString() !== user.toString()) {
    response.status(401);
    throw new Error("Only the creator can delete this workspace");
  }

  await Workspace.deleteOne({ _id: id });

  response.status(200).json({ message: "Workspace deleted" });
});

export { createWorkspace, deleteWorkspace };
