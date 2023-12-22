// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "./logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{8,}$/;

    if (
      emailRegex.test(username) &&
      passwordRegex.test(password) &&
      password === "SmartServTest@123"
    ) {
      setLoggedIn(true);
      alert("Login successful!");
      // Redirect to the dashboard upon successful login
      navigate("/dashboard");
    } else {
      alert(
        "Invalid credentials. Please enter a valid email and a password that meets the requirements."
      );
    }
  };


    const handleForgotPassword = () => {
      // Open default email client with a pre-filled email
      const supportEmail = "support@smartserv.io";
      const subject = "Password Reset Request";
      const body =
        "Dear SmartServ Support Team,\n\nI need assistance with resetting my password.";

      window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    };
  
  
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-8 bg-gray-900 rounded-xl shadow-md">
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
            <h2 className="sr-only">Login</h2>
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
                <Link
                  to="#"
                  className="text-gray-400 underline"
                  onClick={handleForgotPassword}
                >
                  Forgot Your Password?
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
