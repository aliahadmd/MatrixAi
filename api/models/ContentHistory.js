const mongoose = require("mongoose");

// schema for the Users

const HistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
},
  {
    timestamps: true,
  }
);

const ContentHistory = mongoose.model("ContentHistory", HistorySchema);

module.exports = ContentHistory;
