import React, { useState } from 'react';
import EmailForm from './components/EmailForm';
import OtpForm from './components/OtpForm';

const App = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');

    const handleOTPSent = () => {
        setOtpSent(true);
    };

    return (
        <div>
            {!otpSent ? (
                <EmailForm onOTPSent={handleOTPSent} setEmail={setEmail} />
            ) : (
                <OtpForm email={email} />
            )}
        </div>
    );
};

export default App;