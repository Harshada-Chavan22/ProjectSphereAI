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

router.put("/:id", protect, updateTaskStatus);// this is a router for update task status

module.exports = router; //this exports the router so it can be used in other parts of the application