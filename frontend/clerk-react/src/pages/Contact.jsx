import React, { useState } from "react";
import "./Contact.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaGlobe,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreeToSMS: false,
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    if (!formData.email) {
      setStatus({
        type: "error",
        message: "Email is required",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.message) {
      setStatus({
        type: "error",
        message: "Message is required",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowSuccessAnimation(true);
        
        setStatus({
          type: "success",
          message:
            "Your message has been sent successfully! We will get back to you soon.",
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          agreeToSMS: false,
        });

        setTimeout(() => {
          setShowSuccessAnimation(false);
        }, 3000);

        setTimeout(() => {
          setStatus({ type: "", message: "" });
        }, 5000);
      } else {
        const errorMessage = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.error || "Failed to send message. Please try again.";

        setStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message:
          "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      {showSuccessAnimation && (
        <div className="success-overlay">
          <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <p className="success-text">Message Sent Successfully!</p>
          </div>
        </div>
      )}

      <div className="contact-wrapper">
        <div className="contact-left">
          <h2>
            Contact <span>Us</span>
          </h2>

          <p>
            We're proud to serve customers nationwide with top-quality
            second-hand car parts, trusted by thousands of mechanics and vehicle
            owners. Contact us for genuine OEM replacements at affordable prices.
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
              <p className="contact-detail">
                550 Congressional Blvd, Suite 350, Carmel, IN 46032
              </p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="contact-form">
            <h3>
              Get in Touch with <span>Nexxa</span> Auto Parts
            </h3>
            <h4>Send a message</h4>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.type === "success" ? (
                  <FaCheckCircle className="status-icon" />
                ) : (
                  <FaExclamationCircle className="status-icon" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">Subject type</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Parts Request">Parts Request</option>
              <option value="Support">Support</option>
              <option value="Order Status">Order Status</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feedback">Feedback</option>
            </select>

            <textarea
              name="message"
              placeholder="Comment"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <div className="checkbox">
              <input
                type="checkbox"
                name="agreeToSMS"
                checked={formData.agreeToSMS}
                onChange={handleChange}
              />
              <label>
                By checking this box, you agree to receive customer care, account
                notifications and delivery notification SMS messages.
              </label>
            </div>

            <button type="button" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;