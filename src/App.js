import { useState } from 'react';
import './App.css';
import axios from 'axios';
import DataGraph from './components/DataGraph';
import DataTable from './components/DataTable';
import Login from './components/Login';

function App() {
  const [loginID, setLoginID] = useState('');
  const [isStateChange, setIsStateChange] = useState(false);

  const handleLogOut = () => {
    setIsStateChange(false);
    const time = new Date();
    const logoutTime = time.toLocaleTimeString([], { hour12: false });
    axios
      .put(`http://localhost:5000/logout/${loginID}`, {
        logoutTime: logoutTime,
      })
      .then((res) => {
        setIsStateChange(true);
      });
    setLoginID('');
  };
  return (
    <div className="App my-3">
      {loginID ? (
        <button
          onClick={handleLogOut}
          className="px-2 py-1 border bg-blue-500 text-white rounded my-3"
        >
          Logout
        </button>
      ) : (
        <Login setLoginID={setLoginID} />
      )}

      <DataTable isStateChange={isStateChange} />
      <DataGraph isStateChange={isStateChange} />
    </div>
  );
}

export default App;
