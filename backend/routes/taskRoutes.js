// backend/routes/taskRoutes.js
const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTasks) // Get all tasks for the user
  .post(protect, createTask); // Create a new task

router.route('/:id')
  .get(protect, getTaskById) // Get a single task by ID
  .put(protect, updateTask) // Update a task
  .delete(protect, deleteTask); // Delete a task

router.put('/:id/status', protect, updateTaskStatus); // Mark task as completed/pending

module.exports = router;