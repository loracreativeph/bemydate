const mongoose = require("mongoose");

const DateRequestSchema = new mongoose.Schema(
  {
    askerName: String,
    // askerEmail: String,
    receiverName: String,
    // receiverEmail: String,
    theme: String,
    chosenDate: String,
    foodVibe: String,
    responded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DateRequest", DateRequestSchema);