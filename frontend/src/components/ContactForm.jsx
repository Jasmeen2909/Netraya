import { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ isOpen, onClose }) => {
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
    <div className={`contact-popup ${isOpen ? 'show' : ''}`}>
      <div className="contact-form">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {!isSubmitted ? (
          <>
            <h2>Contact Us</h2>
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
                <textarea
                  className="form-input"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </>
        ) : (
          <div className="success-message show">
            <div className="success-icon"></div>
            <p className="success-text">Message sent successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;