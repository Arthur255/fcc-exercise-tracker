const User = require("../models/user");
const shortid = require("shortid");
const express = require("express");
const router = express.Router();

// get all users
router.get("/", async (req, res, next) => {
  try {
    let users = await User.find();
    users = users.map(({ username, id }) => ({ username, _id: id }));
    res.status(200).send(users);
  } catch (err) {
    return next(err);
  }
});

// create a new user
router.post("/", async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    id: shortid.generate()
  });

  const error = user.validateSync();
  if (error) {
    return next(error);
  }

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
