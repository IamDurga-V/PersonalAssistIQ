const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  file: {
    type: String,
    // This can be a URL or a path where the file is stored
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
