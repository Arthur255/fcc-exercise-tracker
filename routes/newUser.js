const shortid = require("shortid");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  id: { type: String, require: true, unique: true }
});

const User = mongoose.model("User", userSchema);

router.post("/", async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    id: shortid.generate()
  });

  try {
    await user.save();
    res.status(201).send({ username: user.username, _id: user.id });
  } catch (err) {
    if (err.code && err.code === 11000) {
      res
        .status(409)
        .type("txt")
        .send("username already taken");
    } else {
      next(err);
    }
  }
});

module.exports = router;
