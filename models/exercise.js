const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  id: { type: String, require: true },
  description: {
    type: String,
    minlength: [1, "description too short"],
    maxlength: [100, "description too long"],
    required: true
  },
  duration: { type: Number, min: [1, "duration too short"], required: true },
  date: { type: Date, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
