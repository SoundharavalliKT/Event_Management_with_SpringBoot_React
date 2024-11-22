import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const EditEventPage = () => {
    const Event_URL = "http://localhost:8080/event";
    const User_URL = "http://localhost:8080/user";

    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: ''
    });
    const [userData, setUserData] = useState({
        user_id: '',
        user_name: '',
        hashed_password: '',
        email: '',
        location: '',
        active: '',
        no_of_events_hosted: '',
        no_of_registered_events: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response1 = await fetch(Event_URL + "/all");
            const eventData = await response1.json();
            setEvents(eventData);

            const queryParams = new URLSearchParams({ email: sessionStorage.getItem('userEmail') }).toString();
            const response2 = await fetch(User_URL+"/get-user?" + queryParams);
            if (!response2.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response2.json();
            setUserData(userData);
        } catch (err) {
            setError('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                <h2>My Events</h2>
                <div className='event-list'>
                    {events.filter(x => x.user_id == userData.user_id).map((event) => (
                        <div key={event.id} className='event-card'>
                            <div>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p>Date: {event.date}</p>
                                <p>Location: {event.location}</p>
                            </div>
                            <div>
                                <button className="register-btn"><Link to="/edit-event-form" state={{ event }} className='link'>Edit</Link></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default EditEventPage;
