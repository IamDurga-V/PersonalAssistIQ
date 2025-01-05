// routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task'); // Adjust the path based on your directory structure
const router = express.Router();

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send('Server error');
    }
});

// Create a new task
router.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).send('Server error');
    }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send('Server error');
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send('Task not found');
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
