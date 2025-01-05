## PersonalAssist IQ

**PersonalAssist IQ** is a smart personal assistant web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It helps users manage their tasks, stay updated with weather forecasts, track important events with notifications, access the latest news, and sync their schedules with Google Calendar. The tool is designed to enhance productivity, help users reclaim control over their time, and simplify daily life management.

## Objective

The primary objective of **PersonalAssist IQ** is to provide users with a comprehensive platform that handles task management, weather updates, news fetching, email notifications, and calendar integration seamlessly. By leveraging smart technologies, **PersonalAssist IQ** empowers individuals to stay organized and make informed decisions about their daily tasks and responsibilities.

## Features

- **User Authentication**: Secure login and registration.
- **Task Management**: Create, track, and organize to-do lists and tasks based on deadlines, priorities, and categories.
- **Weather Updates**: Get real-time weather updates and forecasts based on the user's location.
- **Email Notifications**: Receive timely email alerts for important tasks, reminders, and upcoming events.
- **News Fetching**: Fetch the latest news headlines relevant to the user's preferences and interests.
- **Calendar Integration**: Sync tasks, events, and reminders with Google Calendar, ensuring efficient scheduling and reminders.

## How to run the project?

### Prerequisites
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version)
- [MongoDB](https://www.mongodb.com/try/download/community) (local setup or MongoDB Atlas)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Clone the repository
Clone this repository to your local machine:
```bash
git clone https://github.com/IamDurga-V/personalassistiq.git
cd personalassistiq
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd server
```

2. Install the required dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `server` directory and add the following environment variables:
```bash
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id (for calendar integration)
GOOGLE_CLIENT_SECRET=your_google_client_secret (for calendar integration)
```

4. Run the backend server:
```bash
npm start
```
The backend will be available at [http://localhost:5000](http://localhost:5000).

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd client
```

2. Install the required dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```
The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Connecting Frontend with Backend
The frontend will automatically interact with the backend running on `http://localhost:5000`.

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **APIs**: OpenWeatherMap API, NewsAPI, Google Calendar API, Twilio(for notifications)
- **Styling**: CSS, Material-UI

## Contributing

We welcome contributions! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit and push your changes.
5. Create a pull request.


## Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the database.
- [Express.js](https://expressjs.com/) for the backend framework.
- [React.js](https://reactjs.org/) for the frontend framework.
- [Node.js](https://nodejs.org/) for the runtime environment.
- [NewsAPI](https://newsapi.org/) for news fetching.
- [OpenWeatherMap](https://openweathermap.org/) for weather updates.
- [Google Calendar API](https://developers.google.com/calendar) for calendar integration.
- [Twilio]([https://sendgrid.com/](https://login.twilio.com/u/signup?state=hKFo2SBHMkdYVlhkZXZtMEFqeU4yMGRfN2Jlbkg2ZlhOWXZSeqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDhQOXcwbGhYMFZscXVaTExSZk9XWnQ0X2dvM2ZKTGQ3o2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks)) for notifications.


### Team Members:
1. [Durga V](https://github.com/IamDurga-V)  
2. [Dhanya R](https://github.com/Dhanyaravi0903)
3. Boomika J

