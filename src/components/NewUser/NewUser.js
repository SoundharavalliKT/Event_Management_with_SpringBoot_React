import './NewUser.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewUser = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [text, setText] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(formData).toString();

        try {
            const response = await fetch('http://localhost:8080/user/add?' + queryParams, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const text = await response.text();
                if (text == "Account Created Successfully") {
                    setText("Account Created Successfully. Please proceed to login!");
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 10000000);
                }
                else {
                    setText(text);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 5000);
                }
                setFormData({ name: '', email: '', password: '', location: '' }); 
            } else {
                alert('Failed to add user');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='parent-container'>
            <div className='background'><h2>Welcome To Our Event Management Portal</h2><h2>Let's Explore the events</h2></div>
            <div className='create-account'>
                <h2 className='sign-up-txt'>Create an account</h2>
                <div>Don't have an account? it takes less than a minute. If you already have an account, <Link to='/'>Login</Link></div>
                <form onSubmit={handleSubmit}>
                    <div className='label-field'>

                        <input
                            type="text"
                            name="name"
                            className='input'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                            required
                        />
                    </div>
                    <div className='label-field'>

                        <input
                            type="email"
                            name="email"
                            className='input'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your mail id'
                            required
                        />
                    </div>
                    <div className='label-field'>

                        <input
                            type='password'
                            name="password"
                            className='input'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter a strong password'
                            required
                        />
                    </div>
                    <div className='label-field'>

                        <input
                            name="location"
                            className='input'
                            value={formData.location}
                            onChange={handleChange}
                            placeholder='Enter your location'
                            required
                        />
                    </div>
                    <button className="create-account-btn" type="submit">Sign Up</button>
                </form>

                {showAlert && (
                    <div className='msg'>
                        {text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewUser;