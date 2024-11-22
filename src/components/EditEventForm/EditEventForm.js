import './EditEventForm.css';
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from "react-router-dom";


const EditEventForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { event } = location.state || { event: {} };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: ''
    });
    
    const fetchEventData = async () => {
        try {
            setFormData(event);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventData();
    }, []);

    const cancel = (e) =>{
        navigate('/edit-event');
    }

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
            const response = await fetch(`http://localhost:8080/event/update-event`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update event data');
            }
            alert('Event information updated successfully!');
            navigate('/edit-event')
        } catch (err) {
            setError(err.message);
        }
    };
    
    return(
        <div className='create-event-parent-container'>
            <div className='event-form'>
            <h2>Edit event details</h2>
            <div>
            <form onSubmit={handleSubmit}>
                <div className='event-field'>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            className='event-input'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='event-field'>
                    <label>
                        Description:
                        <input
                            name="description"
                            className='event-input'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='event-field'>
                    <label>
                        Date:
                        <input
                            type='date'
                            name="date"
                            className='event-input'
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='event-field'>
                    <label>
                        Time:
                        <input
                            type='time'
                            name="time"
                            className='event-input'
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='event-field'>
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
                <div className='btn-div'>
                <button className='cancel-btn' onClick={() => cancel()}>Cancel</button>
                <button className='create-event-btn' type="submit">Update Event</button>
                </div>
                
            </form>
            </div>
            </div>
        </div>
    );
};

export default EditEventForm;