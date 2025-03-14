// src/components/AccountList/AccountList.js
import React from 'react';
import './AccountList.css';

const AccountList = ({ accounts, onEdit, onDelete }) => {
  return (
    <div className="account-list">
      {accounts.map((account) => (
        <div key={account.id} className="account-item">
          <div>
            <h2>{account.name}</h2>
            <p>Balance: ₹{account.balance}</p>
          </div>
          <div>
            <button onClick={() => onEdit(account)}>Edit</button>
            <button onClick={() => onDelete(account.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;