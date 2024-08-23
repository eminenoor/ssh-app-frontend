import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Command, Device, CommandResult } from "../types";
import { commandList } from "../services/SSHSenderService";

const SshSenderPage: React.FC = () => {
    const { state } = useLocation();
    const device: Device = state?.device;
    const [commands, setCommands] = useState<Command[]>([]);
    const [selectedCommand, setSelectedCommand] = useState<string>("");
    const [commandResult, setCommandResult] = useState<CommandResult | null>(null);

    useEffect(() => {
    
    commandList()
    .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
            setCommands(response.data);
        } else {
            console.error("Unexpected data format:", response.data);
        }
    })
    .catch((error) => {
        console.error(error);
    });
    }, []);

    const handleCommandSend = () => {
        if (device && selectedCommand) {
            axios.post<CommandResult>(`http://localhost:8080/ssh/connect/${device.id}`, null, {
                params: { command: selectedCommand }
            })
            .then((response) => {
                setCommandResult(response.data);
                alert("Command executed successfully: " + response.data.output);
            })
            .catch((error) => {
                alert("Failed to execute command: " + error.message);
            });
        } else {
            alert("Please select a command.");
        }
  };

  if (!device) {
    return <div>No device information available.</div>;
  }

  return (
    <div className="container mt-5">
        <h2>SSH Command Sender</h2>
        <div className="form-group">
            <label>Device ID:</label>
            <input type="text" className="form-control" value={device.id} readOnly />
        </div>
        <div className="form-group">
            <label>IP Address:</label>
            <input type="text" className="form-control" value={device.ip} readOnly />
        </div>
        <div className="form-group">
            <label>User Name:</label>
            <input type="text" className="form-control" value={device.userName} readOnly />
        </div>
        <div className="form-group">
            <label>Password:</label>
            <input type="text" className="form-control" value={device.password} readOnly />
        </div>
        <div className="form-group">
            <label>Select Command:</label>
            <select className="form-control" value={selectedCommand} onChange={(e) => setSelectedCommand(e.target.value)}>
            <option value="">Select a command</option>
            {commands.map((command) => (
                <option key={command.id} value={command.command}>{command.name}</option>
            ))}
            </select>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleCommandSend}>Send Command</button>
        {commandResult && (
            <div className="alert alert-info mt-3">
            <strong>Command Output:</strong> {commandResult.output}
            </div>
        )}
    </div>
    );
};

export default SshSenderPage;
