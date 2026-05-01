const express = require("express");
const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");
const isLoggedIn = require("../middleware/auth");
const isAdmin = require("../middleware/role");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res) => {
  const user = req.session.user;

  let tasks;

  if (user.role === "Admin") {
    tasks = await Task.find()
      .populate("project")
      .populate("assignedTo");
  } else {
    tasks = await Task.find({ assignedTo: user.id })
      .populate("project")
      .populate("assignedTo");
  }

  res.render("tasks", { tasks });
});

router.get("/new", isLoggedIn, isAdmin, async (req, res) => {
  const projects = await Project.find();
  const members = await User.find({ role: "Member" });

  res.render("newTask", { projects, members });
});

router.post("/", isLoggedIn, isAdmin, async (req, res) => {
  const { title, project, assignedTo, dueDate } = req.body;

  await Task.create({
    title,
    project,
    assignedTo,
    dueDate,
    createdBy: req.session.user.id
  });

  res.redirect("/tasks");
});

router.post("/:id/status", isLoggedIn, async (req, res) => {
  const { status } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.send("Task not found");
  }

  if (
    req.session.user.role !== "Admin" &&
    task.assignedTo.toString() !== req.session.user.id
  ) {
    return res.send("Access denied");
  }

  task.status = status;
  await task.save();

  res.redirect("/tasks");
});

router.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks");
});

module.exports = router;