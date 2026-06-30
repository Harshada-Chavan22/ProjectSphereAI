const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTask);

router.get("/:projectId", protect, getTasks);

router.delete("/:id", protect, deleteTask);

module.exports = router;