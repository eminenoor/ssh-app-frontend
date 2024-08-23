import React, { useState } from 'react';
import axios from 'axios';
import { Device, CommandResult } from '../types';

interface CommandExecutorProps {
  device: Device;
}

const CommandExecutor: React.FC<CommandExecutorProps> = ({ device }) => {
  const [command, setCommand] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const executeCommand = () => {
    setLoading(true);
    axios.post<CommandResult>(`http://localhost:8080/ssh/connect/${device.id}`, null, {
      params: { command }
    })
      .then(response => setResult(response.data.output))
      .catch(error => setResult(`Error: ${error.message}`))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ width: '60%' }}>
      <h2>Execute Command on {device.userName}@{device.ip}</h2>
      <textarea
        value={command}
        onChange={e => setCommand(e.target.value)}
        rows={4}
        style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        placeholder="Enter command (e.g., ls ~/Desktop)"
      />
      <button onClick={executeCommand} disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Executing...' : 'Execute Command'}
      </button>
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <h3>Result:</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default CommandExecutor;
