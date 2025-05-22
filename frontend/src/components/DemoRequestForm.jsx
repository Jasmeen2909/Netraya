import { useState } from 'react';
import './DemoRequestForm.css';

const DemoRequestForm = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={`demo-popup ${isOpen ? 'show' : ''}`}>
      <div className="demo-form">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {!isSubmitted ? (
          <>
            <h2>Request a Demo</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Organization name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-input"
                  placeholder="Tell us about your requirements"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Request Demo</button>
            </form>
          </>
        ) : (
          <div className="success-message show">
            <div className="success-icon"></div>
            <p className="success-text">Thank you for your interest! We'll get back to you soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoRequestForm;