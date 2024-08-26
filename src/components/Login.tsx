import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            navigate("/devices");
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid d-flex justify-content-center">
                    <span className="navbar-brand mb-0 h1">SSH Command Executer</span>
                </div>
            </nav>
            <div className="login-form-container">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
