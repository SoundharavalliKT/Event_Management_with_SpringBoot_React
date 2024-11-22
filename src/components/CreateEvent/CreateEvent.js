import './CreateEvent.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        email: ''
      });

      
    const cancel = (e) =>{
        navigate('/dashboard');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.email=sessionStorage.getItem('userEmail');
        const queryParams = new URLSearchParams(formData).toString();

        try {
            const response = await fetch('http://localhost:8080/event/add?' + queryParams, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const text = await response.text();
                alert(text);
                if(text=="Event Added Successfully")
                    navigate('/dashboard');
                setFormData({ title: '', description: '', date: '', time: '', location: '', email: '' });
            } else {
                alert('Failed to add event');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='create-event-parent-container'>
            <div className='event-form'>
            <h2>Adding new event</h2>
            <div>
            <form onSubmit={handleSubmit}>
                <div className='event-field'>
                        <input
                            type="text"
                            name="title"
                            className='event-input'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Event Title'
                            required
                        />
                </div>
                <div className='event-field'>
                        <textarea
                            name="description"
                            value={formData.description}
                            className='event-input'
                            onChange={handleChange}
                            placeholder='Description'
                            required
                        />
                </div>
                <div className='event-field'>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            className='event-input'
                            onChange={handleChange}
                            placeholder='Event Date'
                            required
                        />
                </div>
                <div className='event-field'>
                        <input
                            type='time'
                            name="time"
                            value={formData.time}
                            className='event-input'
                            onChange={handleChange}
                            placeholder='Event Timing'
                            required
                        />
                </div>
                <div className='event-field'>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className='event-input'
                            placeholder='Event Location'
                            required
                        />
                </div>
                <div className='btn-div'>
                <button className='cancel-btn' onClick={() => cancel()}>Cancel</button>
                <button className='create-event-btn' type="submit">Submit</button>
                </div>
            </form>
            </div>
            </div>
        </div>
    );
};

export default CreateEvent;