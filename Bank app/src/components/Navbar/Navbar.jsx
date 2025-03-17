// src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-account">Create Account</Link>
      <Link to="/fund-transfer">Fund Transfer</Link>
      <Link to="/deposit">Deposit</Link>
      <Link to="/withdraw">Withdraw</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
};

export default Navbar;