// src/components/EditAccountModal/EditAccountModal.js
import React, { useState } from 'react';
import './EditAccountModal.css';

const EditAccountModal = ({ account, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: account.name,
    balance: account.balance,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...account, ...formData });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Account</h2>
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
            placeholder="Balance"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
            required
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountModal;