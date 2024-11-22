import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminManageUsers = () => {

    const User_URL = "http://localhost:8080/user";
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(User_URL+"/all");
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
       fetchData();
    }, []);

    const deleteUser = async (id) => {

        const queryParams = new URLSearchParams({ user_id: id }).toString();
    
        try {
            const response = await fetch('http://localhost:8080/user/delete-user?' + queryParams, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                const text = await response.text(); 
                if (text == "Deleted Successfully") {
                    fetchData();
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

                <h2>Users List</h2>
                <div className='event-list'>
                    {users.map((user) => (
                        <div key={user.user_id} className='event-card'>
                            <div>
                                <h3>{user.user_name}</h3>
                                <p>Email: {user.email}</p>
                                <p>Location: {user.location}</p>
                            </div>
                            <div>
                                <button className="register-btn" onClick={() => deleteUser(user.user_id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AdminManageUsers;