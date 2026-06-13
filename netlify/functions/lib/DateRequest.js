const mongoose = require('mongoose');

const dateRequestSchema = new mongoose.Schema(
  {
    linkId: { type: String, required: true, unique: true },
    askerName: { type: String, required: true },
    askerEmail: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    theme: {
      type: String,
      enum: ['romantic', 'kawaii', 'retro', 'minimalist'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'],
      default: 'pending',
    },
    chosenDate: { type: String, default: null },
    foodVibe: { type: String, default: null },
  },
  { timestamps: true }
);

// Prevent model recompilation in serverless environment
module.exports =
  mongoose.models.DateRequest ||
  mongoose.model('DateRequest', dateRequestSchema);
