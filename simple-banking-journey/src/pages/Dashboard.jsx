import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaExchangeAlt, FaCreditCard, FaPiggyBank, FaShieldAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [balance] = useState(5842.15);
  
  // Sample recent transactions
  const recentTransactions = [
    {
      id: 1,
      type: 'expense',
      title: 'Grocery Shopping',
      amount: 82.45,
      date: 'Today',
      category: 'Shopping'
    },
    {
      id: 2,
      type: 'income',
      title: 'Salary Deposit',
      amount: 3500.00,
      date: 'Yesterday',
      category: 'Income'
    },
    {
      id: 3,
      type: 'purchase',
      title: 'Netflix Subscription',
      amount: 15.99,
      date: 'Apr 15, 2023',
      category: 'Entertainment'
    }
  ];
  
  // Quick action buttons
  const quickActions = [
    {
      title: 'Send Money',
      icon: FaExchangeAlt,
      color: 'bg-blue-50 text-blue-600',
      path: '/services'
    },
    {
      title: 'Cards',
      icon: FaCreditCard,
      color: 'bg-purple-50 text-purple-600',
      path: '/services'
    },
    {
      title: 'Savings',
      icon: FaPiggyBank,
      color: 'bg-green-50 text-green-600',
      path: '/services'
    },
    {
      title: 'Insurance',
      icon: FaShieldAlt,
      color: 'bg-amber-50 text-amber-600',
      path: '/services'
    }
  ];

  return (
    <div className="dashboard">
      <section className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to SimpleBank</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your simple and secure banking solution
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Balance Card */}
        <div className="card balance-card">
          <h2>Account Balance</h2>
          <div className="balance-amount">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="balance-footer">
            <span>Main Account</span>
            <Link to="/transactions" className="button button-secondary">
              View Details
            </Link>
          </div>
        </div>
        
        {/* Quick Actions Card */}
        <div className="card">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link 
                key={index} 
                to={action.path}
                className="quick-action-item"
              >
                <div className={`quick-action-icon ${action.color}`}>
                  <action.icon />
                </div>
                <span>{action.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Transactions */}
      <section className="mt-8">
        <div className="card">
          <div className="card-header">
            <h2>Recent Transactions</h2>
            <Link to="/transactions" className="view-all">
              View All
            </Link>
          </div>
          <div className="transactions-list">
            {recentTransactions.map((transaction) => (
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
                  <span className="transaction-date">{transaction.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 