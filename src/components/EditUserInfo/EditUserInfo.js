import './EditUserInfo.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const EditUserInfo = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        hashed_password: '',
        location: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const changePassword = async () => {
        navigate('/change-password')
    };

    const fetchUserData = async () => {
        try {
            const queryParams = new URLSearchParams({ email: sessionStorage.getItem('userEmail') }).toString();
            const response = await fetch(`http://localhost:8080/user/get-user?` + queryParams);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            setFormData(userData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/user/update-user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            sessionStorage.setItem('userEmail', formData.email)
            alert('User information updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

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
                <div className='event-form'>
                    <div className='change-password-div'>
                        <div>
                            <h2>My Profile</h2>
                        </div>
                        <div>
                            <button className='update-user-btn change-password-btn' onClick={() => changePassword()} type="submit">Change Password</button>
                        </div>

                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='event-field-profile'>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="user_name"
                                        className='event-input'
                                        value={formData.user_name}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className='event-field-profile'>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        className='event-input'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className='event-field-profile'>
                                <label>
                                    Location:
                                    <input
                                        name="location"
                                        className='event-input'
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <button className='update-user-btn' type="submit">Update My Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserInfo;
