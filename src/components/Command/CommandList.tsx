import React, { useEffect, useState } from "react";
import { commandList } from "../../services/CommandService";
import { Command } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommandList = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [selectedCommands, setSelectedCommands] = useState<number[]>([]);

  const navigator = useNavigate();

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
        toast.error("Failed to fetch commands.");
      });
  }, []);

  const handleSelectCommand = (id: number) => {
    setSelectedCommands((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((commandId) => commandId !== id)
        : [...prevSelected, id]
    );
  };

  const handleEditCommand = () => {
    if (selectedCommands.length === 1) {
      const commandId = selectedCommands[0];
      navigator(`/edit-command/${commandId}`);
    } else {
      toast.info("Please select a single command to edit.");
    }
  };

  const handleDeleteCommands = async () => {
    const token = localStorage.getItem("token");

    if (selectedCommands.length > 0) {
      try {
        await Promise.all(
          selectedCommands.map((id) =>
            axios.delete(`http://localhost:8080/commands/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setCommands((prevCommands) =>
          prevCommands.filter(
            (command) => !selectedCommands.includes(command.id)
          )
        );

        setSelectedCommands([]);
        toast.success("Command(s) deleted successfully!");
      } catch (error) {
        console.error("Error deleting commands:", error);
        toast.error("Failed to delete the command(s).");
      }
    } else {
      toast.warning("No commands selected to delete.");
    }
  };

  const addNewCommand = () => {
    navigator("/add-command");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Commands</h2>

      <div className="table-responsive">
        <table className="table table-stripped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Command</th>
            </tr>
          </thead>
          <tbody>
            {commands.length === 0 ? (
              <tr>
                <td colSpan={5}>No commands available</td>
              </tr>
            ) : (
              commands.map((command) => (
                <tr key={command.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCommands.includes(command.id)}
                      onChange={() => handleSelectCommand(command.id)}
                    />
                  </td>
                  <td>{command.name}</td>
                  <td>{command.description}</td>
                  <td>{command.command}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="button-group mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={handleEditCommand}
          disabled={selectedCommands.length !== 1}
        >
          Edit Command
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={handleDeleteCommands}
          disabled={selectedCommands.length === 0}
        >
          Delete Command(s)
        </button>
        <button className="btn btn-primary" onClick={addNewCommand}>
          Add Command
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default CommandList;
