import React, { useState } from "react";
import "./Contact.css";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    smsConsent: false, // ✅ added correctly
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

    if (!formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Email and message are required",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.smsConsent) {
      setStatus({
        type: "error",
        message: "Please agree to the SMS consent to continue.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

      // ❌ do NOT send smsConsent to backend
      const { smsConsent, ...payload } = formData;

      const response = await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowSuccessAnimation(true);
        setStatus({
          type: "success",
          message: "Your message has been sent successfully!",
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          smsConsent: false, // ✅ reset correctly
        });

        setTimeout(() => setShowSuccessAnimation(false), 3000);
        setTimeout(() => setStatus({ type: "", message: "" }), 5000);
      } else {
        setStatus({
          type: "error",
          message:
            data.error ||
            Object.values(data.errors || {}).flat().join(", ") ||
            "Failed to send message",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please try again.",
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
            <p>✔ Message Sent</p>
          </div>
        </div>
      )}

      <div className="contact-wrapper">
        {/* LEFT SECTION */}
        <div className="contact-left">
          <h2>
            Contact <span>Us</span>
          </h2>

          <p>
            We're proud to serve customers nationwide with top-quality
            second-hand car parts, trusted by thousands of mechanics and vehicle
            owners.
          </p>

          <div className="contact-box">
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h4>Email</h4>
              <p>info@nexxaauto.com</p>
            </div>

            <div className="contact-card">
              <FaPhoneAlt className="contact-icon" />
              <h4>Phone</h4>
              <p>+1 (888) 266-0007</p>
            </div>

            <div className="contact-card">
              <FaGlobe className="contact-icon" />
              <h4>Website</h4>
              <p>www.nexxaauto.com</p>
            </div>

            <div className="contact-card">
              <FaMapMarkerAlt className="contact-icon" />
              <h4>Address</h4>
              <p>550 Congressional Blvd, Suite 350, Carmel, IN 46032</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="contact-right">
          <div className="contact-form">
            <h3>Get in Touch with Nexxa Auto Parts</h3>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.type === "success" ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationCircle />
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
              <option value="">Subject</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Parts Request">Parts Request</option>
              <option value="Support">Support</option>
            </select>

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            {/* SMS CONSENT */}
            <div className="sms-consent">
              <label>
                <input
                  type="checkbox"
                  name="smsConsent"
                  checked={formData.smsConsent}
                  onChange={handleChange}
                />
                <span>
                  By checking this box, you agree to receive customer care,
                  account notifications and delivery notification SMS messages
                  from <strong>NEXXA AUTO PARTS</strong>. You may reply{" "}
                  <strong>STOP</strong> to opt-out at any time. Reply{" "}
                  <strong>HELP</strong> to (463) 223-5914. Messages and data rates
                  may apply. Learn more on our{" "}
                  <a href="/privacy-policy" target="_blank">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms-and-conditions" target="_blank">
                    Terms & Conditions
                  </a>.
                </span>
              </label>
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
