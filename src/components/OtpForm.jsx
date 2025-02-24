import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPForm = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const sendOTP = async () => {
        const res = await fetch("http://localhost:5000/auth/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) {
            setShowOtpInput(true);
            setMessage("OTP sent successfully!");
        } else {
            setMessage(data.error);
        }
    };

    const verifyOTP = async () => {
        const res = await fetch("http://localhost:5000/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        if (res.ok) {
            navigate("/welcome"); // Redirect to welcome page
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center p-5">
            {!showOtpInput ? (
                <>
                    <h2 className="text-xl font-bold mb-3">Enter Your Email</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 mb-3"
                    />
                    <button onClick={sendOTP} className="bg-blue-500 text-white px-4 py-2">
                        Send OTP
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-xl font-bold mb-3">Enter OTP</h2>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border p-2 mb-3"
                    />
                    <button onClick={verifyOTP} className="bg-green-500 text-white px-4 py-2">
                        Verify OTP
                    </button>
                </>
            )}
            <p className="mt-3">{message}</p>
        </div>
    );
};

export default OTPForm;
