// boardModel.js
import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace', 
    required: true,
  },
  // Add other fields as needed
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
