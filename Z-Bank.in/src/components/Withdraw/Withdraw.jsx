// src/components/Withdraw/Withdraw.js
import React, { useState, useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import './Withdraw.css';

const Withdraw = () => {
  const [withdrawData, setWithdrawData] = useState({
    account: '',
    amount: '',
  });

  const { accounts, updateAccountBalance } = useContext(AccountContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawData.amount);
    if (isNaN(amount)) {
      alert('Please enter a valid amount.');
      return;
    }
    const account = accounts.find((acc) => acc.id === parseInt(withdrawData.account));
    if (account && account.balance >= amount) {
      updateAccountBalance(account.id, -amount);
      alert('Withdrawal successful!');
    } else {
      alert('Insufficient balance.');
    }
    setWithdrawData({ account: '', amount: '' }); // Reset form
  };

  return (
    <div className="withdraw">
      <h1>Withdraw</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={withdrawData.account}
          onChange={(e) => setWithdrawData({ ...withdrawData, account: e.target.value })}
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
          value={withdrawData.amount}
          onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
          required
        />
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
};

export default Withdraw;