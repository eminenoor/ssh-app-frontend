import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddDevice: React.FC = () => {
  const [ip, setIP] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const newDevice = { ip, password, userName };
      const response = await axios.post("http://localhost:8080/devices", newDevice, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      toast.success("Device added successfully!");
      navigate("/devices");
    } catch (error) {
      console.error("There was an error adding the device:", error);
      toast.error("Failed to add the device");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-form-group">
          <label htmlFor="ip">IP Address</label>
          <input
            type="text"
            className="form-control"
            id="ip"
            value={ip}
            onChange={(e) => setIP(e.target.value)}
            required
          />
        </div>
        <div className="form-form-group">
          <label htmlFor="user_name">Username</label>
          <input
            type="text"
            className="form-control"
            id="user_name"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-btn">
          Add Device
        </button>
      </form>
    </div>
  );
};

export default AddDevice;
