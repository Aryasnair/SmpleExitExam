const express = require('express');
const router = express.Router();
const Otp = require('../models/emailSchema');
const nodemailer = require('nodemailer');

// Generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

// Route to send OTP
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = generateOTP();

    const newOtp = new Otp({ email, otp });
    await newOtp.save();

    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });

    if (otpRecord) {
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

module.exports = router;