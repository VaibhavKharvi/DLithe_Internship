// src/components/HomePage/HomePage.jsx
import React, { useState, useContext } from 'react'; // Add useState here
import { AccountContext } from '../../context/AccountContext';
import AccountList from '../AccountList/AccountList';
import EditAccountModal from '../EditAccountModal/EditAccountModal';
import './HomePage.css';

const HomePage = () => {
  const { accounts, updateAccount, deleteAccount } = useContext(AccountContext);
  const [selectedAccount, setSelectedAccount] = useState(null); // Correct usage of useState
  const [isModalOpen, setIsModalOpen] = useState(false); // Correct usage of useState

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleSave = (updatedAccount) => {
    updateAccount(updatedAccount);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteAccount(id);
  };

  return (
    <div className="home-page">
      <h1>Ze-Bank</h1>
      <AccountList accounts={accounts} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <EditAccountModal
          account={selectedAccount}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;