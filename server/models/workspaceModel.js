import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({});

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  },
);

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    columns: [columnSchema],
  },
  {
    timestamps: true,
  },
);

const workspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    boards: [boardSchema],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Workspace = mongoose.model("Workspace", workspaceSchema);
const Board = mongoose.model("Board", boardSchema);

export { Workspace, Board };
