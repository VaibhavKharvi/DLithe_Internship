// src/components/Deposit/Deposit.js
import React, { useState, useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import './Deposit.css';

const Deposit = () => {
  const [depositData, setDepositData] = useState({
    account: '',
    amount: '',
  });

  const { accounts, updateAccountBalance } = useContext(AccountContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositData.amount);
    if (isNaN(amount)) {
      alert('Please enter a valid amount.');
      return;
    }
    updateAccountBalance(parseInt(depositData.account), amount);
    alert('Deposit successful!');
    setDepositData({ account: '', amount: '' }); // Reset form
  };

  return (
    <div className="deposit">
      <h1>Deposit</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={depositData.account}
          onChange={(e) => setDepositData({ ...depositData, account: e.target.value })}
          required
        >
          <option value="">Select Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} (₹{account.balance})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={depositData.amount}
          onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
          required
        />
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
};

export default Deposit;