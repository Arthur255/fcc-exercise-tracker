const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [1, "username too short"],
    maxlength: [50, "username too long"],
    require: true,
    unique: true
  },
  id: { type: String, require: true, unique: true },
  exercises: { type: [], default: [] }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
