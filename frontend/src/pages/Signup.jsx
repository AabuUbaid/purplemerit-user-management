import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!fullName || !email || !password) {
            return setError("All fields are required");
        }

        if (!isValidEmail(email)) {
            return setError("Invalid email format");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        try {
            await api.post("/auth/signup", {
                fullName,
                email,
                password,
            });

            setSuccess("Signup successful. Please login.");
            setTimeout(() => navigate("/"), 1200);
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };


    return (
        <div className="container">
            <h2>Signup</h2>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <br />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <button type="submit">Create Account</button>
            </form>

            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
}
