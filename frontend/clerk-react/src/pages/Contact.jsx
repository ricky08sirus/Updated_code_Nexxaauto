import React from "react";
import "./Contact.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaGlobe,
  FaMapMarkerAlt
} from "react-icons/fa";


const Contact = () => {
  return (
    <section className="contact-page">
      <div className="contact-wrapper">

{/* LEFT SIDE */}
<div className="contact-left">
  <h2>
    Contact <span>Us</span>
  </h2>

  <p>
    We're proud to serve customers nationwide with top-quality
    second-hand car parts, trusted by thousands of mechanics and
    vehicle owners. Contact us for genuine OEM replacements at
    affordable prices.
  </p>

  <div className="contact-box">

    <div className="contact-card">
      <div className="contact-row">
        <FaEnvelope className="contact-icon" />
        <h4>Email</h4>
      </div>
      <p className="contact-detail">info@nexxaauto.com</p>
    </div>

    <div className="contact-card">
      <div className="contact-row">
        <FaPhoneAlt className="contact-icon" />
        <h4>Phone</h4>
      </div>
      <p className="contact-detail">+1 (888) 266-0007</p>
    </div>

    <div className="contact-card">
      <div className="contact-row">
        <FaGlobe className="contact-icon" />
        <h4>Website</h4>
      </div>
      <p className="contact-detail">www.nexxaauto.com</p>
    </div>

    <div className="contact-card">
      <div className="contact-row">
        <FaMapMarkerAlt className="contact-icon" />
        <h4>Address</h4>
      </div>
      <p className="contact-detail">550 Congressional Blvd, Suite 350, Carmel, IN 46032</p>
    </div>

  </div>
</div>


        {/* RIGHT SIDE */}
        <div className="contact-right">

          <form className="contact-form">
                      <h3>
            Get in Touch with <span>Nexxa</span> Auto Parts
          </h3>
            <h4>Send a message</h4>

            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />

            <select>
              <option>Subject type</option>
              <option>General Enquiry</option>
              <option>Parts Request</option>
              <option>Support</option>
            </select>

            <textarea placeholder="Comment"></textarea>

            <div className="checkbox">
              <input type="checkbox" />
              <label>
                By checking this box, you agree to receive customer care,
                account notifications and delivery notification SMS messages.
              </label>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
