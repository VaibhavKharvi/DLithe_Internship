import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="layout">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              BankApp
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/transactions" className="nav-link">Transactions</Link>
            </div>
          </div>
          <div className="nav-right">
            <div className="user-menu">
              <button className="user-button" onClick={() => navigate('/profile')}>
                <i className="fas fa-user"></i>
              </button>
              <button className="logout-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 