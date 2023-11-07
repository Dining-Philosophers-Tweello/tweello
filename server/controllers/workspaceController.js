import asyncHandler from "express-async-handler";
import Workspace from "../models/workspaceModel.js";

// @desc    Get a user's workspaces
// @route   GET /api/workspaces
// @access  Private
const getWorkspaces = asyncHandler(async (request, response) => {
  const currentUserId = request.user._id;
  const workspaces = await Workspace.find({
    $or: [{ members: currentUserId }, { creator: currentUserId }],
  }).exec();

  response.status(200).json({
    workspaces: workspaces,
  });
});

// @desc    Get a workspace
// @route   GET /api/workspaces/:id
// @access  Private
const getWorkspace = asyncHandler(async (request, response) => {
  const workspaceId = request.params.workspaceId;
  const currentUserId = request.user._id;

  // Find workspace or check if the workspace exists
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

  const isValidUser = await Workspace.findOne({
    _id: workspace._id,
    $or: [{ creator: currentUserId }, { members: { $in: [currentUserId] } }],
  })
    .then((workspace) => {
      if (workspace) {
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
    throw new Error("You do not have permission to get this workspace");
  }

  response.status(200).json(workspace);
});

// @desc    Create a new workspace
// @route   POST /api/workspaces
// @access  Private
const createWorkspace = asyncHandler(async (request, response) => {
  const { name } = request.body;
  const creator = request.user._id;

  const workspaceExists = await Workspace.findOne({ name });

  if (workspaceExists) {
    response.status(400);
    throw new Error("Workspace with this name already exists");
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
  const workspaceId = request.params.workspaceId;
  const currentUserId = request.user._id;
  const { name, memberId } = request.body;

  // Find workspace or check if the workspace exists
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

  if (currentUserId.toString() !== workspace.creator.toString()) {
    response.status(401);
    throw new Error("Only the creator can edit this workspace");
  }

  workspace.name = name || workspace.name;

  if (memberId) {
    workspace.members.push(memberId);
  }

  const updatedWorkspace = await workspace.save();

  response.status(200).json({
    _id: updatedWorkspace._id,
    name: updatedWorkspace.name,
    members: updatedWorkspace.members,
    creator: updatedWorkspace.creator,
  });
});

// @desc    Delete a workspace
// @route   DELETE /api/workspaces/:id
// @access  Private
const deleteWorkspace = asyncHandler(async (request, response) => {
  const workspaceId = request.params.workspaceId;
  const user = request.user._id;

  // Find workspace or check if the workspace exists
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

  if (workspace.creator.toString() !== user.toString()) {
    response.status(401);
    throw new Error("Only the creator can delete this workspace");
  }

  await Workspace.deleteOne({ _id: workspaceId });

  response.status(200).json({ message: "Workspace deleted" });
});

export {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
  getWorkspace,
  getWorkspaces,
};
