// src/context/AccountContext.js
import React, { useState, createContext } from 'react';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Virat Kohli', balance: 1000 },
    { id: 2, name: 'Rohit Sharma', balance: 2000 },
    { id: 3, name: 'Hardik Pandya', balance: 3000 },
    { id: 4, name: 'MS Dhoni', balance: 4000 },
  ]);

  const addAccount = (newAccount) => {
    setAccounts([...accounts, { id: accounts.length + 1, ...newAccount, balance: parseFloat(newAccount.balance) }]);
  };

  const updateAccount = (updatedAccount) => {
    setAccounts(
      accounts.map((account) =>
        account.id === updatedAccount.id ? { ...account, ...updatedAccount, balance: parseFloat(updatedAccount.balance) } : account
      )
    );
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const updateAccountBalance = (id, amount) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, balance: parseFloat(account.balance) + parseFloat(amount) } : account
      )
    );
  };

  return (
    <AccountContext.Provider
      value={{
        accounts,
        addAccount,
        updateAccount,
        deleteAccount,
        updateAccountBalance,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};