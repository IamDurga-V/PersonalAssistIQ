// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './pages/TaskContext';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import LandingPage from './LandingPage';
import MainContent from './MainContent';
import SideBar from './SideBar';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import Reminder from './pages/Reminder';
import ReminderList from './pages/ReminderList';
import Newsapp from './pages/Newsapp';
import Weather from './pages/Weather';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/maincontent' element={<MainContent />} />
          <Route path='/sidebar' element={<SideBar />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/remind" element={<Reminder/>} />
          <Route path="/remindlist" element={<ReminderList/>} />
          <Route path="/news" element={<Newsapp/>} />
          <Route path="/weather" element={<Weather/>} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
