import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update login state
  };

  return (
    <header className="header">
      <div className="logo">netraya.</div>
      
      <nav>
        <ul className="nav-links">
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Our Services</a></li>
          <li><a href="#articles">Articles</a></li>
        </ul>
      </nav>
      
      <div className="auth-buttons">
        {isLoggedIn && (
          <button onClick={handleLogout} className="contact-btn">Logout</button>
        )}
        <button className="contact-btn">Contact Us</button>
      </div>
    </header>
  );
};

export default Header;
