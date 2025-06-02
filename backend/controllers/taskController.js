// backend/controllers/taskController.js
const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 }); // Sort by creation date descending
  res.json(tasks);
});

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found or unauthorized');
  }
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, category, dueDate, status } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a title');
  }

  const task = await Task.create({
    user: req.user._id, // Assign the task to the authenticated user
    title,
    description,
    category,
    dueDate,
    status,
  });

  res.status(201).json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, category, dueDate, status } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    // Ensure the logged-in user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.category = category || task.category;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    // Ensure the logged-in user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this task');
    }

    await Task.deleteOne({ _id: req.params.id }); // Using deleteOne to remove the document
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Mark task as completed or not completed
// @route   PUT /api/tasks/:id/status
// @access  Private
const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // Expecting 'completed' or 'pending'

  const task = await Task.findById(req.params.id);

  if (task) {
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this task status');
    }

    task.status = status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus
};