import React, { useState } from 'react';
import axios from 'axios';

const OtpForm = ({ email }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
            alert(response.data.message);
            if (response.data.message === 'OTP verified successfully') {
                window.location.href = '/welcome';
            }
        } catch (error) {
            console.error(error);
            alert('Invalid OTP');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter OTP:</label>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
            />
            <button type="submit">Submit OTP</button>
        </form>
    );
};

export default OtpForm;