import './AdminDashboard.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {

    const Event_URL = "http://localhost:8080/event";

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAttendees = async (id) => {

        const queryParams = new URLSearchParams({ event_id: id }).toString();

        try {
            const response = await fetch('http://localhost:8080/event_registration/get-attendees?' + queryParams, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const text = await response.text();
                console.log("Response Text:", text.split('["')[1].split('"]')[0].split('","'));
                alert("Attendees List: \n\t" + text.split('["')[1].split('"]')[0].split('","'));

            } else {
                alert('Failed to get attendees list');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(Event_URL + "/all");
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

                <h2>Upcoming Events</h2>
                <div className='event-list'>
                    {events.filter(x => new Date(x.date) > new Date()).map((event) => (
                        <div key={event.id} className='event-card'>
                            <div>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <p>Date: {event.date}</p>
                                <p>Location: {event.location}</p>
                            </div>
                            <div>
                                {event.no_of_attendees >0 && <button className="attendees-btn" onClick={() => getAttendees(event.event_id)} >{event.no_of_attendees} Attendees</button>}
                                {event.no_of_attendees ==0 && <button className="attendees-btn">{event.no_of_attendees} Attendees</button>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AdminDashboard;