// components/Footer.jsx
import React from "react";
import "./Footer.css";
import logo from "../assets/images/brands/nexxa logo.png"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* 1️⃣ Logo & About */}
        <div className="footer-col">
          <img src={logo} alt="Nexxa Auto Parts Logo" className="footer-logo" />
          <p>
            Nexxa Auto Parts provides quality used OEM auto parts at affordable
            prices. Trusted by mechanics and vehicle owners nationwide.
          </p>
        </div>

        {/* 2️⃣ Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Services</a></li>
          </ul>
        </div>

        {/* 3️⃣ Contact Us */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Nexxa Auto Parts<br />550 Congressional Blvd Suite 350<br />Carmel, IN 46032</p>
          <p>Phone: +1 (888) 266-0007</p>
          <p>Email: info@nexxaauto.com</p>
        </div>

        {/* 4️⃣ Newsletter */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe for updates on new arrivals, restocks, and exclusive offers from Nexxa Auto Parts.</p>
          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Nexxa Auto Parts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
