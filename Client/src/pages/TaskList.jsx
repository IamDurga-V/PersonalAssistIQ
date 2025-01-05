// TaskList.jsx
import React, { useState } from 'react';
import { useTasks } from './TaskContext';
import './TaskList.css';

const TaskList = () => {
    const { tasks, updateTask, deleteTask } = useTasks();
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({
        _id: null,
        title: '',
        description: '',
        priority: 'medium',
        startDate: '',
        dueDate: '',
        completed: false,
        reminder: false,
    });

    const handleEditClick = (task) => {
        setEditTaskId(task._id);
        setEditedTask({ ...task });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateTask({ ...editedTask });
            setEditTaskId(null);
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="task-list-container">
            <h1>Task List</h1>
            {tasks.length === 0 ? (
                <p>No tasks available. Create a task to get started.</p>
            ) : (
                <div className="task-grid">
                    {tasks.map((task) => (
                        <div key={task._id} className="task-card">
                            {editTaskId === task._id ? (
                                <form onSubmit={handleUpdate} className="edit-form">
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editedTask.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="title">Description:</label>
                                    <textarea
                                        name="description"
                                        value={editedTask.description}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="title">Priority:</label>
                                    <select
                                        name="priority"
                                        value={editedTask.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    <label htmlFor="title">Start Date:</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={editedTask.startDate}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="title">End Date:</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={editedTask.dueDate}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label>
                                        Completed:
                                        <input
                                            type="checkbox"
                                            name="completed"
                                            checked={editedTask.completed}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <label>
                                        Daily Reminder:
                                        <input
                                            type="checkbox"
                                            name="reminder"
                                            checked={editedTask.reminder}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    <div className="form-button-container">
    <button type="submit" className="oval-button update-button">Update</button>
    <button type="button" className="oval-button cancel-button" onClick={() => setEditTaskId(null)}>Cancel</button>
</div>
                                </form>
                            ) : (
                                <>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <p>Priority: {task.priority}</p>
                                    <p>Start: {new Date(task.startDate).toLocaleDateString()}</p>
                                    <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                    <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                                    <p>Reminder: {task.reminder ? 'Yes' : 'No'}</p>
                                    <div className="button-container">
                                    <button 
                                        className="oval-button edit-button" 
                                        id={`edit-button-${task._id}`} 
                                        onClick={() => handleEditClick(task)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="oval-button delete-button" 
                                        id={`delete-button-${task._id}`} 
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                               </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
