// src/components/FundTransfer/FundTransfer.js
import React, { useState, useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import './FundTransfer.css';

const FundTransfer = () => {
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
  });

  const { accounts, updateAccountBalance } = useContext(AccountContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fromAccount = accounts.find((acc) => acc.id === parseInt(transferData.fromAccount));
    const toAccount = accounts.find((acc) => acc.id === parseInt(transferData.toAccount));

    if (!fromAccount || !toAccount) {
      alert('Please select valid accounts.');
      return;
    }

    if (fromAccount.id === toAccount.id) {
      alert('You cannot transfer funds to the same account.');
      return;
    }

    const amount = parseFloat(transferData.amount);

    if (isNaN(amount)) {
      alert('Please enter a valid amount.');
      return;
    }

    if (fromAccount.balance < amount) {
      alert('Insufficient balance in the source account.');
      return;
    }

    // Deduct amount from the "From Account"
    updateAccountBalance(fromAccount.id, -amount);

    // Add amount to the "To Account"
    updateAccountBalance(toAccount.id, amount);

    alert('Transfer successful!');
    setTransferData({ fromAccount: '', toAccount: '', amount: '' }); // Reset form
  };

  return (
    <div className="fund-transfer">
      <h1>Fund Transfer</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={transferData.fromAccount}
          onChange={(e) => setTransferData({ ...transferData, fromAccount: e.target.value })}
          required
        >
          <option value="">Select From Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} (₹{account.balance})
            </option>
          ))}
        </select>
        <select
          value={transferData.toAccount}
          onChange={(e) => setTransferData({ ...transferData, toAccount: e.target.value })}
          required
        >
          <option value="">Select To Account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} (₹{account.balance})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={transferData.amount}
          onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
          required
        />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default FundTransfer;