// src/components/CreateAccount/CreateAccount.js
import React, { useState, useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import './CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
  });

  const { addAccount } = useContext(AccountContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAccount({ name: formData.name, balance: parseFloat(formData.balance) });
    setFormData({ name: '', balance: '' }); // Reset form
  };

  return (
    <div className="create-account">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Initial Balance"
          value={formData.balance}
          onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;