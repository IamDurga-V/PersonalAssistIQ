const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Ensure this path is correct

// Update a task
router.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send('Task not found');
        }
        res.json(updatedTask); // Return the updated task
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
