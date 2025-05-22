import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Services.css';
import serviceIcon from '/src/assets/serviceIcon.png';

const Services = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleCardClick = (e, path) => {
    // Prevents the click event from triggering if it's from a button click
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
      if (!isLoggedIn) {
        navigate("/signup");
      } else {
        navigate(path);
      }
    }
  };

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="service-cards">
        {/* Left Card */}
        <div
          className="service-card-wrapper service-card-link"
          onClick={(e) => handleCardClick(e, "/servicespage")}
        >
          <div className="service-card">
            <img src={serviceIcon} alt="Service Icon" className="service-icon" />
            <h3>AI-Powered Research Analysis for Eye Care</h3>
            <p>Utilize our AI model to analyze vast datasets, uncovering insights that drive better patient outcomes.</p>
          </div>
          <div className="service-actions">
            <a
              href="https://www.perlego.com/book/1011064/handbook-of-retinal-screening-in-diabetes-diagnosis-and-management-pdf"
              className="service-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
            {!isLoggedIn && (
              <Link to="/signup" className="sign-up-link">Sign Up &gt;</Link>
            )}
          </div>
        </div>

        {/* Right Card */}
        <div
          className="service-card-wrapper service-card-link"
          onClick={(e) => handleCardClick(e, "/servicespage")}
        >
          <div className="service-card">
            <img src={serviceIcon} alt="Service Icon" className="service-icon" />
            <h3>Request a Demo to Experience Our Solutions</h3>
            <p>See how our innovative tool can transform your practice.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Services;
