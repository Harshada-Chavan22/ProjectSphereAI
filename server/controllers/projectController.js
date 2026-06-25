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
//const Project = require("../models/Project");

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById
};