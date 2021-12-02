import React, { useEffect, useState } from 'react';

const DataTable = ({ isStateChange }) => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/logs')
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, [isStateChange]);
  return (
    <div className="my-3">
      <table className="table-auto mx-auto border border-blue-500 text-left ">
        <thead>
          <tr className="bg-blue-400 text-white">
            <th className="pr-2 font-medium">Received From</th>
            <th className="pr-2 font-medium">Application Name</th>
            <th className="pr-2 font-medium">Outage Start</th>
            <th className="pr-2 font-medium">Outage End</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border border-blue-500">
              <td>{log.receivedFrom}</td>
              <td>{log.name}</td>
              <td>{log.loginTime}</td>
              <td>{log.logoutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
