const mongoose = require("mongoose");
const Exercise = require("./exercise");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    require: true,
    unique: true
  },
  id: { type: String, require: true, unique: true },
  exercises: { type: [], default: [] }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
