import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReminderList.css'; // Import the CSS file for styling

const ReminderList = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getAllReminder');
                setReminders(response.data);
            } catch (err) {
                setError('Error fetching reminders. Please try again later.');
                console.error('Error fetching reminders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReminders();
    }, []);

    const deleteReminder = (id) => {
        axios.post("http://localhost:3001/deleteReminder", { id })
            .then(res => {
                // Assuming the backend sends back the updated reminder list
                setReminders(res.data);  // Update the reminder list with the response
            })
            .catch(err => {
                console.error("Error deleting reminder:", err);
                setError('Failed to delete reminder. Please try again later.');
            });
    };

    if (loading) return <p>Loading reminders...</p>;
    if (error) return <p>{error}</p>;
    if (reminders.length === 0) return <p>No reminders found.</p>; // Friendly message if no reminders are found

    return (
        <div className="reminder-list-container">
            <h2>Reminder List</h2><br /><br />
            <div className="reminder-cards">
                {reminders.map(reminder => (
                    <div className="reminder-card" key={reminder._id}>
                        <h3 className="reminder-message">{reminder.reminderMsg}</h3>
                        <p className="reminder-timestamp">
                            Remind Me at: {new Date(reminder.remindAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                        </p>
                        <button className="reminder-delete-button" onClick={() => deleteReminder(reminder._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReminderList;
