import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminManageEvents = () => {

    const Event_URL = "http://localhost:8080/event";
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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

    const deleteEvent = async (id) => {

        const queryParams = new URLSearchParams({ event_id: id }).toString();

        try {
            const response = await fetch('http://localhost:8080/event/delete-event?' + queryParams, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const text = await response.text();
                if (text == "Deleted Successfully") {
                    fetchData();
                    console.log(events);
                }

                alert(text);
            } else {
                alert('Failed to Delete');
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
                    <li className='dashboard-sidebar-item'><Link to="/admin-dashboard" className='link'>Dashboard</Link></li>
                    <li className='dashboard-sidebar-item'><Link to="/admin-manage-events" className='link'>Manage Events</Link></li>
                    <li className='dashboard-sidebar-item'><Link to="/admin-manage-users" className='link'>Manage Users</Link></li>
                    <li className='dashboard-sidebar-item'><Link to="/" className='link'>Log out</Link></li>
                </ul>
            </div>


            <div className='dashboard-container'>
                <h1 className='title'>Dashboard</h1>

                <h2>Events List</h2>
                <div className='event-list'>
                    {events.map((event) => (
                        <div key={event.id} className='event-card'>
                            <div>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p>Date: {event.date}</p>
                                <p>Location: {event.location}</p>
                            </div>
                            <div>
                                <button className="register-btn" onClick={() => deleteEvent(event.event_id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AdminManageEvents;