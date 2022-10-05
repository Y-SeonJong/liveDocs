const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nick: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);
