// src/components/Logout/Logout.js
import React from 'react';
import './Logout.css';

const Logout = () => {
  const handleLogout = () => {
    // Handle logout logic (e.g., clear session, redirect to login)
    console.log('User logged out');
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div className="logout">
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;