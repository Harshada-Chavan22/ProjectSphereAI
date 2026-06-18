const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { title, description, domain } = req.body;

    const project = await Project.create({
      title,
      description,
      domain,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};