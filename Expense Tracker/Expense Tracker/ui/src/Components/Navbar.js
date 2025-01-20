import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you add styles here

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard" className="navbar-brand">
          Expense Tracker
        </Link>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>
        </li>
        
        <li>
          <Link to="/expenses" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Expenses
          </Link>
        </li>
        <li>
          <Link to="/incomes" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Incomes
          </Link>
        </li>

        <li>
          <Link to="/categories" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Categories
          </Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
