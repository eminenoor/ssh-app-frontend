import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import './Login.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username);
            navigate("/devices");
        } catch (error) {
            console.error("Login failed", error);
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h1 className="header-title">SSH Command Executer</h1>
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Username" required
                        />
                        <FaUser className="icon"/>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password" required
                        />
                        <FaLock className="icon"/>
                    </div>
                    <button type="submit" className="login">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
