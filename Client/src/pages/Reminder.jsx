import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import './Reminder.css';

function Reminder() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindDate, setRemindDate] = useState(new Date());
  const [remindTime, setRemindTime] = useState("09:00");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // Function to validate phone number format
  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return regex.test(phoneNumber);
  };

  const addReminder = () => {
    // Basic validation for required fields
    if (!reminderMsg || !remindDate || !remindTime || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Invalid phone number format.");
      return;
    }

    // Create a new Date object for reminder and set time in local timezone
    const remindAt = new Date(remindDate);
    const [hours, minutes] = remindTime.split(":").map(Number);
    remindAt.setHours(hours, minutes, 0, 0);  // Set time in local timezone

    console.log('Reminder message:', reminderMsg);
    console.log('Reminder date and time:', remindAt.toString());  // Display in local time
    console.log('Phone number:', phoneNumber);

    // Send reminder data to backend
    axios.post("http://localhost:3001/addReminder", { 
        reminderMsg, 
        remindAt: remindAt.toISOString(),  // Send in ISO format
        phoneNumber 
      })
      .then(() => {
        navigate('/remindlist'); // Redirect to reminder list after adding
      })
      .catch(err => {
        console.error("Error adding reminder:", err);
        alert("Failed to add reminder. Please try again.");
      });

    // Reset form fields
    setReminderMsg("");
    setRemindDate(new Date());
    setRemindTime("09:00");
    setPhoneNumber("");
  };

  return (
    <div className="reminder-app-container">
      <h1>Remind Me</h1>
      <label className="reminder-label">Reminder:</label>
      <input
        type="text"
        placeholder="Reminder notes here..."
        value={reminderMsg}
        onChange={e => setReminderMsg(e.target.value)}
        className="reminder-input"
      />
      <label className="reminder-label">Date:</label>
      <DatePicker
        selected={remindDate}
        onChange={date => setRemindDate(date)}
        minDate={new Date()}
        className="reminder-datetime-picker"
      />
      <label className="reminder-label">Time:</label>
      <input
        type="time"
        value={remindTime}
        onChange={e => setRemindTime(e.target.value)}
        className="reminder-time-input"
      />
      <label className="reminder-label">Phone Number:</label>
      <input
        type="text"
        placeholder="Enter phone number (e.g., +1234567890)"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        className="reminder-phone-input"
      />
      <div className="reminder-button-container">
        <button className="reminder-add-button" onClick={addReminder}>Add Reminder</button>
        <button className="reminder-view-button" onClick={() => navigate('/remindlist')}>
          View Reminders
        </button>
      </div>
    </div>
  );
}

export default Reminder;
