const mongoose = require("mongoose");

const dateRequestSchema = new mongoose.Schema(
  {
    askerName: { type: String, required: true },
    askerEmail: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    theme: { type: String, default: "romantic" },
    chosenDate: { type: String, default: null },
    foodVibe: { type: String, default: null },
    responded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DateRequest", dateRequestSchema);