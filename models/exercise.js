const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  id: { type: String, require: true },
  description: { type: String, minlength: 1, required: true },
  duration: { type: Number, min: 0, required: true },
  date: { type: Date, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
