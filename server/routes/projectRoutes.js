const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
  inviteMember,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

// Create Project
router.post("/", protect, createProject);

// Get All Projects
router.get("/", protect, getProjects);

// Get Single Project
router.get("/:id", protect, getProjectById);

router.put("/:id/invite", protect, inviteMember);

module.exports = router;