// src/context/TaskContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null); // State to track errors

    // Fetch tasks from the API
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tasks'); // Updated to the correct port
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setError("Error fetching tasks"); // Set error state
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Add a new task
    const addTask = async (newTask) => {
        try {
            const response = await axios.post('http://localhost:3001/api/tasks', newTask); // Updated to the correct port
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
            setError("Error adding task"); // Set error state
        }
    };

    // Update an existing task
    const updateTask = async (updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/tasks/${updatedTask._id}`, updatedTask); // Updated to the correct port
            setTasks((prevTasks) =>
                prevTasks.map(task => (task._id === updatedTask._id ? response.data : task))
            );
        } catch (error) {
            console.error("Error updating task:", error);
            setError("Error updating task"); // Set error state
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3001/api/tasks/${taskId}`); // Updated to the correct port
            setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("Error deleting task"); // Set error state
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, error }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
