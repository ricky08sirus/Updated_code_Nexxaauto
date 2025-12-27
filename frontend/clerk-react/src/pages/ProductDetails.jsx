import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const location = useLocation();

  // Data coming from previous page
  const {
    productData,
    year,
    make,
    model,
    partCategory,
  } = location.state || {};

  const hasData = productData && productData.description1;

  const [formData, setFormData] = useState({
    year: year || "",
    make: make || "",
    model: model || "",
    partCategory: partCategory || "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // TODO: API call to Django backend
  };

  return (
    <div className="product-page">

      {/* ================= SECTION 1 ================= */}
      <section className="product-section-one">
        <div className="product-grid">

          {/* LEFT SIDE */}
          <div className="product-left">
            {hasData && productData.image ? (
              <img
                src={productData.image}
                alt="Product"
                className="product-image"
              />
            ) : (
              <div className="image-placeholder">No Image Preview</div>
            )}

            <p className="product-text">
              {hasData ? productData.description1 : "No details found"}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="product-right">
            <h3>Request This Product</h3>

            <form className="product-form" onSubmit={handleSubmit}>

              {/* AUTO-FILLED FIELDS */}
              <input type="text" value={formData.year} readOnly />
              <input type="text" value={formData.make} readOnly />
              <input type="text" value={formData.model} readOnly />
              <input type="text" value={formData.partCategory} readOnly />

              {/* USER INPUT FIELDS */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              />

              <button type="submit">Submit</button>
            </form>
          </div>

        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="product-section-two">
        <p>
          {hasData
            ? productData.description2
            : "No additional product information available."}
        </p>
      </section>

      {/* ================= SECTION 3 ================= */}
      <section className="product-section-three">
        <p>
          Thank you for choosing Nexxa Auto Parts. Our team will review
          your request and get back to you as soon as possible.
        </p>
      </section>

    </div>
  );
};

export default ProductDetails;
