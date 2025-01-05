import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Create a new task
export const createTask = async (taskData) => {
    return await axios.post(API_URL, taskData);
};

// Get all tasks
export const getTasks = async () => {
    return await axios.get(API_URL);
};

// Get a specific task
export const getTaskById = async (taskId) => {
    return await axios.get(`${API_URL}/${taskId}`);
};

// Update a task
export const updateTask = async (taskId, taskData) => {
    return await axios.put(`${API_URL}/${taskId}`, taskData);
};

// Delete a task
export const deleteTask = async (taskId) => {
    return await axios.delete(`${API_URL}/${taskId}`);
};
