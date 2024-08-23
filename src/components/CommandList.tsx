import React, { useEffect, useState } from "react";
import { commandList } from "../services/CommandService";
import { Command } from "../types";
import { useNavigate } from "react-router-dom";

const CommandList = () => {
  const [commands, setCommands] = useState<Command[]>([]);

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
      });
  }, []);

  function addNewCommand(){
    navigator("/add-command");
  }

  function logout(){
    navigator("/");
  }

  return (
    <div className="container mt-5">
        <h2 className="text-center mb-4">List of Commands</h2>
        <nav className="navbar navbar-light">
            <form className="form-inline">
                <button className="btn btn-primary mb-2 me-md-4" onClick={addNewCommand}>Add Command</button>
                <button className="btn btn-danger mb-2" onClick={logout}>Logout</button>
            </form>
        </nav>
    <div className="table-responsive">
    <table className="table table-stripped-columns table-bordered text-center">
        <thead className="thead-dark">
        <tr>
            <th>Command ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Command</th>
        </tr>
        </thead>
        <tbody>
        {commands.length === 0 ? (
        <tr><td colSpan={4}>No devices available</td></tr>
        ) : (
        commands.map((command) => (
            <tr key={command.id}>
            <td>{command.id}</td>
            <td>{command.name}</td>
            <td>{command.description}</td>
            <td>{command.command}</td>
            </tr>
        ))
        )}

        </tbody>
    </table>
    </div>
    </div>
  );
};

export default CommandList;
