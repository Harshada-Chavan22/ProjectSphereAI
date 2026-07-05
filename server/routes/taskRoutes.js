const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTask);

router.get("/:projectId", protect, getTasks);

router.delete("/:id", protect, deleteTask);

router.put("/:id", protect, updateTaskStatus);

module.exports = router;