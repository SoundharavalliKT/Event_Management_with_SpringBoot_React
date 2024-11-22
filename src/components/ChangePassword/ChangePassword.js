import React, { useState, useEffect } from 'react';
import './ChangePassword.css';
import { useNavigate, Link } from 'react-router-dom';

const ChangePassword = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: ''
    });

    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    const handleChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleChangeCurrent = (e) => {
        setCurrentPassword(e.target.value);
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams1 = new URLSearchParams({ email: sessionStorage.getItem('userEmail'), password: currentPassword }).toString();
            const response1 = await fetch('http://localhost:8080/user/verify-password?' + queryParams1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const text = await response1.text();
            if (response1.ok && text == "Password Verified") {
                if (currentPassword == newPassword) {
                    alert('New Password should not be same as old password');
                    setCurrentPassword('');
                    setNewPassword('');
                }
                else {
                    const queryParams = new URLSearchParams({ email: sessionStorage.getItem('userEmail'), password: newPassword }).toString();
                    const response = await fetch('http://localhost:8080/user/update-user-password?' + queryParams, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to update password');
                    }
                    alert('Password updated successfully! Please Login again');
                    navigate('/');
                }
            }
            else {
                setCurrentPassword('');
                setNewPassword('');
                alert('Incorrect Current Password');
            }


        } catch (err) {
            setError(err.message);
        }
    };

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
                    <div>
                        <h2>Change Password</h2>

                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='event-field-password'>
                                    <label>
                                        Current Password:
                                        <input
                                            type='password'
                                            name="password"
                                            className='input'
                                            value={currentPassword}
                                            onChange={handleChangeCurrent}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='event-field-password'>
                                    <label>
                                        New Password:
                                        <input
                                            type='password'
                                            name="password"
                                            className='input'
                                            value={newPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                </div>

                                <button className='update-user-btn' type="submit">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ChangePassword;
