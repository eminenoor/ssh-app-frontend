import React, { useEffect, useState } from "react";
import axios from "axios";

interface LogHistory {
    id: number;
    ip: string;
    command: string;
    dateTime: string;
    description: string;
}

const LogHistoryTable: React.FC = () => {
    const [logs, setLogs] = useState<LogHistory[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async (term: string = "") => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<LogHistory[]>(`http://localhost:8080/api/v1/logs/search`, {
                params: { searchTerm: term },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLogs(response.data);
        } catch (error) {
            console.error("There was an error fetching the logs!", error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        fetchLogs(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Log History</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search logs by IP, Command, or Description"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>IP Address</th>
                        <th>Command</th>
                        <th>Date & Time</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td>{log.ip}</td>
                            <td>{log.command}</td>
                            <td>{new Date(log.dateTime).toLocaleString()}</td>
                            <td>{log.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogHistoryTable;
