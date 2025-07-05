// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <div className="nav-container">
          <Link to="/" className="logo">TechFlow Solutions</Link>
          <div className="nav-tabs">
            <Link to="/" className="nav-tab">🏠 Home</Link>
            <Link to="/login/manager" className="nav-tab">👔 Manager/TL Login</Link>
            <Link to="/login/employee" className="nav-tab">👨‍💻 Employee Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
