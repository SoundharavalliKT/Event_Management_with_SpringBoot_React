import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Dashboard = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Event_URL = "http://localhost:8080/event";

  const fetchData = async () => {
    try {
      const response = await fetch(Event_URL+"/all");
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postRegistrations = async (id) => {

    const queryParams = new URLSearchParams({ event_id: id, email: sessionStorage.getItem('userEmail') }).toString();
  
    try {
      const response = await fetch('http://localhost:8080/event_registration/add?' + queryParams, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        const text = await response.text();
        alert(text);
      } else {
        alert('Failed to register');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='dashboard-parent-container'>
      <div className='dashboard-sidebar'>
        <h2>Event Manager</h2>
        <ul className='dashboard-sidebar-list'>
          <li className='dashboard-sidebar-item'><Link to="/dashboard" className='link'>Dashboard</Link></li>
          <li className='dashboard-sidebar-item'><Link to="/create-event" className='link'>Create Event</Link></li>
          <li className='dashboard-sidebar-item'><Link to="/edit-event" className='link'>Edit Event</Link></li>
          <li className='dashboard-sidebar-item'><Link to="/edit-user" className='link'>My Profile</Link></li>
          <li className='dashboard-sidebar-item'><Link to="/" className='link'>Log out</Link></li>
        </ul>
      </div>


      <div className='dashboard-container'>
        <h1 className='title'>Dashboard</h1>

        <h2>Upcoming Events</h2>
        <div className='event-list'>
          {events.filter(x => new Date(x.date) >= new Date()).map((event) => (
            <div key={event.id} className='event-card'>
              <div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
              </div>
              <div>
                <button className="register-btn" onClick={() => postRegistrations(event.event_id)}>Register</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Dashboard;