import React, { useState } from 'react';

const Login = ({ setLoginID }) => {
  const initialLoginInfo = {
    receivedFrom: '',
    name: '',
  };
  const [loginInfo, setLoginInfo] = useState(initialLoginInfo);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...loginInfo };
    newInfo[field] = value;
    setLoginInfo(newInfo);
  };
  const handleBookSubmit = (e) => {
    e.preventDefault();
    const loginTime = new Date();
    const loginData = {
      ...loginInfo,
      loginTime: loginTime.toLocaleTimeString([], { hour12: false }),
      // logoutTime: '',
    };
    // send to the server
    fetch('https://log-outage.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setLoginID(data.insertedId);
        }
      });
  };

  return (
    <div className="my-3">
      <form onSubmit={handleBookSubmit}>
        <input
          className="block my-1 mx-auto border rounded px-2 py-1"
          placeholder="Received From"
          name="receivedFrom"
          onBlur={handleOnBlur}
          type="text"
        />
        <input
          className="block my-1 mx-auto border rounded px-2 py-1"
          placeholder="Name"
          name="name"
          onBlur={handleOnBlur}
          type="text"
        />

        <button
          type="submit"
          className="px-2 py-1 border bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
