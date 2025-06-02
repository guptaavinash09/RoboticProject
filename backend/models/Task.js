// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Link task to a specific user
      required: true,
      ref: 'User', // Reference to the User model
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false, // Description can be optional
    },
    category: {
      type: String,
      enum: ['Work', 'Study', 'Personal', 'Shopping', 'Health', 'Other'], // Predefined categories
      default: 'Personal',
    },
    dueDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;