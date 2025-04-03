import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaExchangeAlt, FaList, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          SimpleBank
        </Link>
      </div>

      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link">
              <FaHome /> Dashboard
            </Link>
            <Link to="/services" className="nav-link">
              <FaList /> Services
            </Link>
            <Link to="/transactions" className="nav-link">
              <FaExchangeAlt /> Transactions
            </Link>
            <Link to="/profile" className="nav-link">
              <FaUser /> Profile
            </Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 