import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      addToast('Subscribed!', 'Welcome to the NOVA Inner Circle. Check your inbox for your 15% VIP welcome code.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="footer-wrapper">
      {/* Newsletter Section */}
      <div className="newsletter-banner">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <h3 className="newsletter-heading">Stay Ahead of the Curve</h3>
            <p className="newsletter-sub">
              Subscribe for exclusive early-access releases, private drop alerts, and an instant 15% discount voucher.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            {subscribed ? (
              <div className="newsletter-success">
                ✓ You're on the VIP list. Welcome aboard!
              </div>
            ) : (
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="btn btn-primary newsletter-btn">
                  Join VIP Club
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main-container">
        <div className="footer-brand-col">
          <div className="brand-logo">
            <div className="logo-symbol">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span className="brand-name">NOVA</span>
            <span className="brand-sub">STUDIO</span>
          </div>
          <p className="footer-mission">
            Purveyors of precision industrial design, acoustic engineering, and minimalist daily workspace architecture.
          </p>
          <div className="footer-badges">
            <span className="badge-pill">🔒 256-Bit SSL Encrypted</span>
            <span className="badge-pill">⚡ Global Fulfillment</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Categories</h4>
          <ul className="footer-links">
            <li><a href="#catalog-section">Studio Audio</a></li>
            <li><a href="#catalog-section">Smart Wearables</a></li>
            <li><a href="#catalog-section">Minimalist Workspace</a></li>
            <li><a href="#catalog-section">Everyday Lifestyle</a></li>
            <li><a href="#catalog-section">Magnetic Accessories</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Customer Care</h4>
          <ul className="footer-links">
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">30-Day Easy Returns</a></li>
            <li><a href="#">Warranty Registration</a></li>
            <li><a href="#">Contact Concierge</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#">Our Philosophy</a></li>
            <li><a href="#">Sustainability Pledges</a></li>
            <li><a href="#">Acoustics Lab</a></li>
            <li><a href="#">Press Kit</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} NOVA Studio Gear Inc. All rights reserved. Crafted with React.
          </p>
          <div className="payment-icons-list">
            <span className="pay-tag">Apple Pay</span>
            <span className="pay-tag">Google Pay</span>
            <span className="pay-tag">Visa</span>
            <span className="pay-tag">Mastercard</span>
            <span className="pay-tag">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
