const mongoose = require("mongoose");

const docsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  content: {
    type: String,
  }
});

module.exports = mongoose.model("Docs", docsSchema);
