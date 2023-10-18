import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({});

const workspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

export default Workspace;
