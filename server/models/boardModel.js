import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({});
const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    columns: [columnSchema]
  },
  {
    timestamps: true,
  },
);

const Board = mongoose.model('Board', boardSchema);

export default Board;
