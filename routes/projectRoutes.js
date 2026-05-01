const express = require("express");
const Project = require("../models/Project");
const isLoggedIn = require("../middleware/auth");
const isAdmin = require("../middleware/role");

const router = express.Router();

router.get("/", isLoggedIn, async (req, res) => {
  const projects = await Project.find().populate("createdBy");
  res.render("projects", { projects });
});

router.get("/new", isLoggedIn, isAdmin, (req, res) => {
  res.render("newProject");
});

router.post("/", isLoggedIn, isAdmin, async (req, res) => {
  const { title, description } = req.body;

  await Project.create({
    title,
    description,
    createdBy: req.session.user.id
  });

  res.redirect("/projects");
});

router.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/projects");
});

module.exports = router;