// components/Footer.jsx
import React from "react";
import "./Footer.css";
// import logo from "../../assets/images/banner-img.webp"; // change path if needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* 1️⃣ Logo & About */}
        <div className="footer-col">
          {/* <img src={logo} alt="Nexxa Auto Parts" className="footer-logo" /> */}
          <p>
            Nexxa Auto Parts provides quality used OEM auto parts at affordable
            prices. Trusted by mechanics and vehicle owners nationwide.
          </p>
        </div>

        {/*  Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/privacy">Term & Services</a></li>
          </ul>
        </div>

        {/* 3 Contact Us */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Nexxa Auto parts 550 congressional Blvd suite 350, carmel IN 46032</p>
          <p>Phone : +1(888)266-0007</p>
          <p>Email : info@nexxaauto.com</p>
        </div>

        {/*  Newsletter */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe for updates on new arrivals.restoke and executive offers from Nexxa Auto parts</p>
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
