import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditDevice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ip, setIp] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized. Please log in.");
      navigate("/login");
      return;
    }

    const fetchDevice = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/devices/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIp(response.data.ip);
        setUserName(response.data.userName);
        setPassword(response.data.password);
      } catch (error) {
        console.error("There was an error fetching the device:", error);
        toast.error("Failed to fetch the device");
        navigate("/devices");
      }
    };

    fetchDevice();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const updatedDevice = { ip, userName, password };
      await axios.put(`http://localhost:8080/devices/${id}`, updatedDevice, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Device updated successfully!");
      navigate("/devices");
    } catch (error) {
      console.error("There was an error updating the device:", error);
      toast.error("Failed to update the device");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-form-group">
          <label htmlFor="ip">IP Address</label>
          <input
            type="text"
            className="form-control"
            id="ip"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
          />
        </div>
        <div className="form-form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditDevice;
