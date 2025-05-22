import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Header.css';
import ContactForm from './ContactForm';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
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
        <button onClick={() => setIsContactOpen(true)} className="contact-btn">Contact Us</button>
      </div>

      <ContactForm 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </header>
  );
};

export default Header;