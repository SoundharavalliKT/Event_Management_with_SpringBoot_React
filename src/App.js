import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage';
import NewUser from './components/NewUser/NewUser';
import EditUserInfo from './components/EditUserInfo/EditUserInfo';
import CreateEvent from './components/CreateEvent/CreateEvent';
import EditEventPage from './components/EditEventPage/EditEventPage';
import EditEventForm from './components/EditEventForm/EditEventForm';
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminManageEvents from './components/AdminManagEvents/AdminManageEvents';
import AdminManageUsers from './components/AdminManageUsers/AdminManageUsers';
import ChangePassword from './components/ChangePassword/ChangePassword';

function App() {
  const [events] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/new-user-account-creation" element={<NewUser />} />
        <Route path="/edit-user" element={<EditUserInfo />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event" element={<EditEventPage />} />
        <Route path="/edit-event-form" element={<EditEventForm />} />
        <Route path="/admin-manage-events" element={<AdminManageEvents />} />
        <Route path="/admin-manage-users" element={<AdminManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
