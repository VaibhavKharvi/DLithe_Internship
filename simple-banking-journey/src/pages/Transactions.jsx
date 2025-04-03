import { useState } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';

const Transactions = () => {
  const [transactions] = useState([
    {
      id: 1,
      type: 'expense',
      title: 'Grocery Shopping',
      amount: 82.45,
      date: 'Today',
      category: 'Shopping',
      status: 'completed'
    },
    {
      id: 2,
      type: 'income',
      title: 'Salary Deposit',
      amount: 3500.00,
      date: 'Yesterday',
      category: 'Income',
      status: 'completed'
    },
    {
      id: 3,
      type: 'purchase',
      title: 'Netflix Subscription',
      amount: 15.99,
      date: 'Apr 15, 2023',
      category: 'Entertainment',
      status: 'completed'
    },
    {
      id: 4,
      type: 'transfer',
      title: 'Transfer to John',
      amount: 200.00,
      date: 'Apr 14, 2023',
      category: 'Transfer',
      status: 'pending'
    },
    {
      id: 5,
      type: 'expense',
      title: 'Restaurant Bill',
      amount: 45.50,
      date: 'Apr 13, 2023',
      category: 'Food',
      status: 'completed'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1>Transaction History</h1>
        <div className="header-actions">
          <button className="button button-secondary">
            <FaFilter /> Filter
          </button>
          <button className="button button-secondary">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      <div className="filters">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-button ${filter === 'income' ? 'active' : ''}`}
          onClick={() => setFilter('income')}
        >
          Income
        </button>
        <button 
          className={`filter-button ${filter === 'expense' ? 'active' : ''}`}
          onClick={() => setFilter('expense')}
        >
          Expenses
        </button>
        <button 
          className={`filter-button ${filter === 'transfer' ? 'active' : ''}`}
          onClick={() => setFilter('transfer')}
        >
          Transfers
        </button>
      </div>

      <div className="transactions-list">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <h3>{transaction.title}</h3>
              <span className="transaction-category">{transaction.category}</span>
            </div>
            <div className="transaction-details">
              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'expense' ? '-' : '+'}
                ${transaction.amount.toFixed(2)}
              </span>
              <div className="transaction-meta">
                <span className="transaction-date">{transaction.date}</span>
                <span className={`transaction-status ${transaction.status}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="no-transactions">
          <p>No transactions found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default Transactions; 