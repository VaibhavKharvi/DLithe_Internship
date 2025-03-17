// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountProvider } from './context/AccountContext';
import HomePage from './components/HomePage/HomePage';
import CreateAccount from './components/CreateAccount/CreateAccount';
import FundTransfer from './components/FundTransfer/FundTransfer';
import Deposit from './components/Deposit/Deposit';
import Withdraw from './components/Withdraw/Withdraw';
import Logout from './components/Logout/Logout';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const App = () => {
  return (
    <AccountProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/fund-transfer" element={<FundTransfer />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </AccountProvider>
  );
};

export default App;