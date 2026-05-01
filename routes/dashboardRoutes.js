const express = require("express");
const Task = require("../models/Task");
const isLoggedIn = require("../middleware/auth");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res) => {
  const user = req.session.user;

  let filter = {};

  if (user.role === "Member") {
    filter.assignedTo = user.id;
  }

  const tasks = await Task.find(filter)
    .populate("project")
    .populate("assignedTo");

  const total = tasks.length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const progress = tasks.filter((task) => task.status === "In Progress").length;
  const completed = tasks.filter((task) => task.status === "Completed").length;

  const overdue = tasks.filter(
    (task) =>
      task.status !== "Completed" && new Date(task.dueDate) < new Date()
  ).length;

  res.render("dashboard", {
    total,
    pending,
    progress,
    completed,
    overdue,
    tasks
  });
});

module.exports = router;