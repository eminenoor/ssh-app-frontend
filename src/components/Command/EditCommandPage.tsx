import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditCommand: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized. Please log in.");
      navigate("/login");
      return;
    }

    const fetchCommand = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/commands/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(response.data.name);
        setDescription(response.data.description);
        setCommand(response.data.command);
      } catch (error) {
        console.error("There was an error fetching the command:", error);
        toast.error("Failed to fetch the command");
        navigate("/commands");
      }
    };

    fetchCommand();
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
      const updatedCommand = { name, description, command };
      await axios.put(`http://localhost:8080/commands/${id}`, updatedCommand, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Command updated successfully!");
      navigate("/commands");
    } catch (error) {
      console.error("There was an error updating the command:", error);
      toast.error("Failed to update the command");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Command</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-form-group">
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
        <div className="form-form-group">
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
        <div className="form-form-group">
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
        <button type="submit" className="form-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCommand;
