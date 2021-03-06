const { User, Exercise } = require("../models/index");
const express = require("express");
const router = express.Router();

// create new exercise
router.post("/", async (req, res, next) => {
  const { userId, description, duration, date } = req.body;
  const exercise = new Exercise({
    id: userId,
    description,
    duration,
    date: date ? new Date(date) : new Date(Date.now())
  });

  const error = exercise.validateSync();
  if (error) return next(error);

  try {
    const user = await User.findOneAndUpdate(
      { id: userId },
      { $push: { exercises: exercise } }
    )
      .select("username id")
      .exec();

    res.status(201).send({
      _id: user.id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
