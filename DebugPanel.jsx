import { useState, useEffect } from "react";
import { msg } from "./ExecutionTracker";
import "./debugPanel.css";

export default function DebugPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(msg.getLogs());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="debug-panel">
      {logs.map((log) => (
        <div key={log.id} className={`log ${log.type}`}>
          <strong>#{log.id}</strong> [{log.type}] — {log.message}
          <br />
          <small>{log.location}</small>
        </div>
      ))}
    </div>
  );
}
