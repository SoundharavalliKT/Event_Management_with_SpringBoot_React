import './LoginPage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EventUrl = "http://localhost:8080/event";
const UserUrl = "http://localhost:8080/user";

const LoginPage = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const setEmail = async () => {
            sessionStorage.setItem('userEmail', "")
        };

        setEmail();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(formData).toString();

        try {
            const response = await fetch('http://localhost:8080/user/sign-in?' + queryParams, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const text = await response.text();
                if (text == "Login Successful") {
                    sessionStorage.setItem("userEmail", formData.email);
                    navigate("/dashboard");
                }
                else {
                    alert(text);
                }
                setFormData({ email: '', password: '' });
            } else {
                alert('Login Failed');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='background-img'>
            <div className='container'>
                <div className='flex-item'>
                    <h1>Event Management</h1>
                    <h5>Makes your job much much easier. A Flexible way to organize your events with perfection.<br />Are you an Admin ? Wanna go to <Link to={'/admin-login'}>Admin Login</Link></h5>
                </div>
                <div className='inner-div'>
                    <div className='login-box'>
                        <h2 className='login-txt'>User Login</h2>
                        <form onSubmit={handleSignIn}>
                            <div className='field'>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    className='field-input'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='field'>
                                <input
                                    type='password'
                                    name="password"
                                    placeholder='Password'
                                    className='field-input'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button className='submit-btn' type="submit">Sign In</button>
                        </form>
                    </div>
                    <div>
                        Don't have account? <Link to="/new-user-account-creation">Create one</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;