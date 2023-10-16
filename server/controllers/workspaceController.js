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

// @desc    Edit an existing workspace's information
// @route   PUT /api/workspaces/:id
// @access  Private
const editWorkspace = asyncHandler(async (request, response) => {
  const workspace = await Workspace.findById(request.params.id);

  if (workspace) {
    workspace.name = request.body.name || workspace.name;

    const updatedWorkspace = await workspace.save();

    response.status(200).json({
      _id: updatedWorkspace._id,
      name: updatedWorkspace.name,
      boards: updatedWorkspace.boards,
      members: updatedWorkspace.members,
      creator: updatedWorkspace.creator,
    });
  } else {
    response.status(404);
    throw new Error("Workspace not found");
  }
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

// @desc    Share a workspace
// @route   PUT /api/workspaces/:id
// @access  Private
const shareWorkspace = asyncHandler(async (request, response) => {
  const workspaceId = request.params.id;
  const { userId } = request.body;
  const currentUserId = request.user._id;

  const workspace = await Workspace.findById(workspaceId);

  if (workspace) {
    if (currentUserId.toString() === workspace.creator.toString()) {
      workspace.members.push(userId);

      const updatedWorkspace = await workspace.save();

      response.status(200).json({
        _id: updatedWorkspace._id,
        name: updatedWorkspace.name,
        members: updatedWorkspace.members,
      });
    } else {
      response.status(401);
      throw new Error("Invalid credentials to share this workspace");
    }
  } else {
    response.status(404);
    throw new Error("Workspace not found");
  }
});

export { createWorkspace, editWorkspace, deleteWorkspace, shareWorkspace };
