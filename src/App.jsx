import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OTPForm from "./components/OtpForm";
import Welcome from "./components/Welcome";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OTPForm />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </Router>
    );
}

export default App;
