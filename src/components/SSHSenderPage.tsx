import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Command, Device, CommandResult } from "../types";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SshSenderPage: React.FC = () => {
  const { state } = useLocation();
  const device: Device = state?.device;
  const [commands, setCommands] = useState<Command[]>([]);
  const [selectedCommand, setSelectedCommand] = useState<string>("");
  const [commandResult, setCommandResult] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommands = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authorized. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get<Command[]>("http://localhost:8080/commands", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommands(response.data);
      } catch (error) {
        console.error("Error fetching commands:", error);
        toast.error("Failed to fetch commands.");
      }
    };

    fetchCommands();
  }, [navigate]);

  const handleCommandSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      if (device && selectedCommand) {
        const response = await axios.post(
            `http://localhost:8080/ssh/connect/${device.id}`,
            null,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
                params: { command: selectedCommand },
            }
            );
            setCommandResult(response.data);
            toast.success("Command executed successfully: ");
        } else {
            toast.info("Please select a command.");
        }
        } catch (error) {
        console.error("Failed to execute command:", error);
        toast.error("Failed to execute the command.");
    }
  };

  if (!device) {
    return <div>No device information available.</div>;
  }

  return (
    <div className="form-container">
      <h2>SSH Command Sender</h2>
      <div className="form-form-group">
        <label>Device ID:</label>
        <input type="text" className="form-control" value={device.id} readOnly />
      </div>
      <div className="form-form-group">
        <label>IP Address:</label>
        <input type="text" className="form-control" value={device.ip} readOnly />
      </div>
      <div className="form-form-group">
        <label>User Name:</label>
        <input type="text" className="form-control" value={device.userName} readOnly />
      </div>
      <div className="form-form-group">
        <label>Password:</label>
        <input type="text" className="form-control" value={device.password} readOnly />
      </div>
      <div className="form-form-group">
        <label>Select Command:</label>
        <select
          className="form-control"
          value={selectedCommand}
          onChange={(e) => setSelectedCommand(e.target.value)}
        >
          <option value="">Select a command</option>
          {commands.map((command) => (
            <option key={command.id} value={command.command}>
              {command.name}
            </option>
          ))}
        </select>
      </div>
      <button className="form-btn" onClick={handleCommandSend}>
        Send Command
      </button>
      {commandResult && (
        <div className="alert alert-info mt-3">
          <strong>Command Output:</strong> {commandResult}
        </div>
      )}
    </div>
  );
};

export default SshSenderPage;
