import  { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add form submission logic here (e.g., API call)
  };

  return (
    <div className="contact-form-container">
      <h2>Contact us</h2>
      <p>Have a question, or want a product recommendation? Get in touch.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">*Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">*Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">*Phone number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">*Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <p className="captcha-text">
          This site is protected by hCaptcha and the hCaptcha{' '}
          <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://www.hcaptcha.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{' '}
          apply.
        </p>

        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
