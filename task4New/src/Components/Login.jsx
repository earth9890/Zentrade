// Login.js
import React, { useState } from "react";

import logo from "./logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{8,}$/;

    if (emailRegex.test(username) && passwordRegex.test(password)) {
      setLoggedIn(true);
      alert("Login successful!");
    } else {
      alert(
        "Invalid credentials. Please enter a valid email and a password that meets the requirements."
      );
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className=" content-center mt-8 p-8 bg-gray-900 rounded-xl shadow-md">
      <img src={logo} className="mx-auto mb-4" />
      {loggedIn ? (
        <>
          <h2 className="text-2xl font-bold text-gray-200 mb-4">
            Welcome, {username} !
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 w-full mt-3 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h2 className="sr-only bg-red-500">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 block w-full text-left border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                required
                title="Please enter a valid email address."
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 text-left rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{8,}$"
                title="Password must contain an uppercase letter, a number, and be at least 8 characters long. Only '@' special character is allowed."
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 w-full mt- text-white px-4 py-2 rounded hover:green-600"
            >
              Login
            </button>
            <div className="mb-4 text-center mt-3">
              <a href="#" className="text-gray-400 underline  ">
                Forgot Your Password?
              </a>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
