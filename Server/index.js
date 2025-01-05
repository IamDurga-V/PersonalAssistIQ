require('dotenv').config();

console.log('Twilio Account SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Twilio Auth Token:', process.env.TWILIO_AUTH_TOKEN);
console.log('Twilio Phone Number:', process.env.TWILIO_PHONE_NUMBER);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require('./routes/taskRoutes');
const PersonalAssist_IQModel = require('./models/PersonalAssist_IQ');
const twilio = require('twilio');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/personalassist_iq", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Twilio Client Setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Authentication Routes (Login/Register)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await PersonalAssist_IQModel.findOne({ email });
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("Password Incorrect");
            }
        } else {
            res.json("No record found");
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await PersonalAssist_IQModel.findOne({ email });
        if (existingUser) {
            res.json("Already Registered");
        } else {
            const user = await PersonalAssist_IQModel.create(req.body);
            res.json({ message: "User registered successfully", user });
        }
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Reminder Schema and Model
const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt: String,  // Ensure format for Date is correct if converting from frontend
    isReminded: Boolean,
    phoneNumber: String 
});
const Reminder = mongoose.model("Reminder", reminderSchema);

// Get All Reminders
app.get("/getAllReminder", async (req, res) => {
    try {
        const reminderList = await Reminder.find({});
        res.send(reminderList);
    } catch (err) {
        console.error("Failed to fetch reminders:", err);
        res.status(500).json({ error: 'Failed to fetch reminders' });
    }
});

// Add Reminder and Send SMS (with formatted phone number)
app.post("/addReminder", async (req, res) => {
    const { reminderMsg, remindAt, phoneNumber } = req.body;
    console.log('Received reminder data:', { reminderMsg, remindAt, phoneNumber });

    try {
        // Ensure phone number is in the correct format for India (prepend +91)
        const formattedPhoneNumber = `+91${phoneNumber}`;  // Prefixing with India's country code (+91)

        // Save the reminder to MongoDB
        const reminder = new Reminder({
            reminderMsg,
            remindAt,
            isReminded: false,
            phoneNumber: formattedPhoneNumber 
        });
        await reminder.save();

        // Send SMS via Twilio
        const message = await client.messages.create({
            body: reminderMsg,
            to: formattedPhoneNumber, // Correct phone number format
            from: process.env.TWILIO_PHONE_NUMBER 
        });

        console.log('SMS sent: ', message.sid);

        // Return the updated list of reminders
        const reminderList = await Reminder.find({});
        res.send(reminderList);
    } catch (err) {
        console.error("Error processing reminder:", err);
        res.status(500).json({ error: 'Failed to add reminder or send SMS', details: err.message });
    }
});

// Delete Reminder
app.post("/deleteReminder", async (req, res) => {
    try {
        await Reminder.deleteOne({ _id: req.body.id });
        const reminderList = await Reminder.find({});
        res.send(reminderList);
    } catch (err) {
        console.error("Failed to delete reminder:", err);
        res.status(500).json({ error: 'Failed to delete reminder' });
    }
});

// Task Routes
app.use('/api', taskRoutes);

// 404 Route Handling
app.use((req, res, next) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
