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
  const workspace = await Workspace.findById(request.params.id);
  const currentUserId = request.user._id;

  if (workspace) {
    if (currentUserId.toString() === workspace.creator.toString()) {
      response.status(200).json({
        _id: workspace._id,
        name: workspace.name,
        boards: workspace.boards,
        members: workspace.members,
        creator: workspace.creator,
      });
    } else {
      response.status(401);
      throw new Error("Invalid credentials to get this workspace");
    }
  } else {
    response.status(404);
    throw new Error("Workspace not found");
  }
});

// @desc    Create a new workspace
// @route   POST /api/workspaces
// @access  Private
const createWorkspace = asyncHandler(async (request, response) => {
  const { name } = request.body;
  const creator = request.user._id;

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
  const currentUserId = request.user._id;
  const { name, boardId, memberId } = request.body;

  if (workspace) {
    if (currentUserId.toString() === workspace.creator.toString()) {
      workspace.name = name || workspace.name;

      if (boardId) {
        workspace.boards.push(boardId);
      }

      if (memberId) {
        workspace.members.push(memberId);
      }

      const updatedWorkspace = await workspace.save();

      response.status(200).json({
        _id: updatedWorkspace._id,
        name: updatedWorkspace.name,
        boards: updatedWorkspace.boards,
        members: updatedWorkspace.members,
        creator: updatedWorkspace.creator,
      });
    } else {
      response.status(401);
      throw new Error("Invalid credentials to edit this workspace");
    }
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

export {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
  getWorkspace,
  getWorkspaces,
};
