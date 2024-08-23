import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCommand: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const newCommand = { name, description, command };
      const response = await axios.post("http://localhost:8080/commands", newCommand, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Command added successfully!");
      navigate("/commands");
    } catch (error) {
      console.error("There was an error adding the command:", error);
      alert("Failed to add the command");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Command</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Command Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="command">Command</label>
          <input
            type="text"
            className="form-control"
            id="command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Command
        </button>
      </form>
    </div>
  );
};

export default AddCommand;
