const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const error = validate(req.query);
  if (error) {
    return res.status(400).send(error);
  }

  try {
    const { userId, from, to, limit } = req.query;
    const user = await User.findOne({ id: userId });
    const logs = applyFilter(user.exercises, from, to, limit);
    logs.forEach(log => (log.date = log.date.toDateString()));

    res.status(200).send({
      _id: user.id,
      username: user.username,
      count: logs.length,
      logs
    });
  } catch (error) {
    next(error);
  }
});

function applyFilter(logs, from, to, limit) {
  if (from) {
    const date = new Date(from);
    logs = logs.filter(log => log.date >= date);
  }
  if (to) {
    const date = new Date(to);
    logs = logs.filter(log => log.date <= date);
  }
  logs = logs.sort((a, b) => b.date - a.date);
  if (limit) {
    logs = logs.slice(0, parseInt(limit));
  }
  return logs;
}

function validate({ userId, from, to, limit }) {
  if (!userId) {
    return "userId required";
  }

  const dateRegex = /\d\d\d\d-\d\d-\d\d/;
  if (from && (!dateRegex.test(from) || new Date(from) === "Invalid Date")) {
    return "Invalid from";
  }
  if (to && (!dateRegex.test(to) || new Date(to) === "Invalid Date")) {
    return "Invalid to";
  }

  const num = parseInt(limit);
  if (limit && (num === NaN || num < 0)) {
    return "Invalid limit";
  }
}

module.exports = router;
