import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = ({ onOTPSent }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/send-otp', { email });
            onOTPSent();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Send OTP</button>
        </form>
    );
};

export default EmailForm;