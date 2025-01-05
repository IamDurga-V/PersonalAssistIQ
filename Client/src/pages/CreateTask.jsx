import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from './TaskContext';
import './CreateTask.css'; // Ensure the CSS file is correctly linked

const CreateTask = () => {
    const navigate = useNavigate();
    const { addTask } = useTasks();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [reminder, setReminder] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                } else {
                    console.log('Notification permission denied.');
                }
            });
        }
    }, []);

    const handleTagChange = (e) => {
        const value = e.target.value.trim();
        if (value && !tags.includes(value)) {
            setTags([...tags, value]);
            e.target.value = ''; // Clear input
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newTask = {
            id: Date.now(), // unique ID
            title,
            description,
            priority,
            startDate,
            dueDate,
            completed,
            reminder,
            tags, // Store tags with the task
        };

        // Schedule notification if due date is in the future
        if (newTask.dueDate) {
            const dueDate = new Date(newTask.dueDate);
            const now = new Date();
            
            if (dueDate > now) {
                const timeout = dueDate - now; // Calculate time difference

                setTimeout(() => {
                    if (Notification.permission === 'granted') {
                        new Notification('Task Reminder', {
                            body: `Don't forget your task: ${newTask.title}`,
                        });
                    } else {
                        console.log('Notification permission not granted');
                    }
                }, timeout);
            }
        }

        addTask(newTask); // Add task to the context
        navigate('/tasks'); // Redirect to TaskList
    };

    return (
        <div className="create-task-container">
            <h1>Task Management</h1><br></br>
            {/* <div className="button-container">
                <button type="button" onClick={() => navigate('/tasks')} className="view-task-button">View Tasks</button>
            </div> */}
            <h2>Create Task</h2><br></br>
            <form className="create-task-form" onSubmit={handleSubmit}>
                <label htmlFor="task-title">Task Title:</label>
                <input 
                    id="task-title"
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Task Title" 
                    required 
                />
                
                <label htmlFor="task-description">Task Description:</label>
                <textarea 
                    id="task-description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Task Description" 
                    required 
                />
                
                <label htmlFor="task-priority">Priority:</label>
                <select 
                    id="task-priority"
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                
                <label htmlFor="start-date">Start Date:</label>
                <input 
                    id="start-date"
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    required 
                />
                
                <label htmlFor="due-date">Due Date:</label>
                <input 
                    id="due-date"
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    required 
                />
                
                <label>
                    Completed:
                    <input 
                        type="checkbox" 
                        checked={completed} 
                        onChange={(e) => setCompleted(e.target.checked)} 
                    />
                </label>
                
                <label>
                    Daily Reminder:
                    <input 
                        type="checkbox" 
                        checked={reminder} 
                        onChange={(e) => setReminder(e.target.checked)} 
                    />
                </label>
                
                <label htmlFor="tag-input">Tags:</label>
                <input
                    id="tag-input"
                    type="text"
                    className="tag-input"
                    placeholder="Add a tag and press Enter"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleTagChange(e);
                    }}
                />
                 <div className="button-container">
                    <button type="submit">Create Task</button>
                    <button type="button" onClick={() => navigate('/tasks')} className="view-tasks-button">
                        View Tasks
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
