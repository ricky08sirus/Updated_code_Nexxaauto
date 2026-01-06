// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { Heart } from 'lucide-react';
// import './OrderPage.css';
// import logoImage from "../assets/images/brands/nexxa logo.png";

// const OrderPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const productData = location.state?.product;
//   const quantity = location.state?.quantity || 1;

//   const [formData, setFormData] = useState({
//     country: 'United States',
//     firstName: '',
//     lastName: '',
//     streetAddress: '',
//     streetAddress2: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     email: '',
//     countryCode: 'US +1',
//     phone: ''
//   });

//   const [orderQuantity, setOrderQuantity] = useState(quantity);

//   useEffect(() => {
//     // If no product data, redirect back to home or previous page
//     if (!productData) {
//       navigate('/');
//     }
//   }, [productData, navigate]);

//   if (!productData) {
//     return (
//       <div className="order-loading">
//         <p>Loading order details...</p>
//       </div>
//     );
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleQuantityChange = (type) => {
//     if (type === 'increase') {
//       setOrderQuantity(prev => prev + 1);
//     } else if (type === 'decrease' && orderQuantity > 1) {
//       setOrderQuantity(prev => prev - 1);
//     }
//   };

//   const handleDone = () => {
//     // Validate form
//     const requiredFields = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zipCode', 'email', 'phone'];
//     const missingFields = requiredFields.filter(field => !formData[field]);
    
//     if (missingFields.length > 0) {
//       alert('Please fill in all required fields');
//       return;
//     }
    
//     console.log('Shipping Address:', formData);
//     alert('Shipping address saved! Proceeding to payment...');
//   };

//   const handleConfirmPay = () => {
//     // Check if shipping address is filled
//     if (!formData.firstName || !formData.email) {
//       alert('Please complete the shipping address first');
//       return;
//     }
    
//     alert('Proceeding to payment gateway...');
//     // Here you would integrate with your payment gateway
//   };

//   const partPrice = productData.price ? parseFloat(productData.price) : 0;
//   const shipping = productData.shipping || 40;
//   const totalPrice = (partPrice * orderQuantity) + shipping;

//   return (
//     <div className="order-page">
//       {/* Header */}
//       <header className="order-header">
//         <Link to="/" className="order-logo-link">
//           <img src={logoImage} alt="Nexxa Logo" className="order-logo-img" />
//         </Link>
//         <button className="order-heart-btn">
//           <Heart size={28} stroke="#c41e3a" fill="none" />
//         </button>
//       </header>

//       <div className="order-container">
//         <div className="order-main-content">
//           {/* Review Order Section */}
//           <div className="review-order-section">
//             <h2 className="section-title">Review Order</h2>
            
//             <div className="seller-info">
//               {/* <div className="seller-logo"> */}
//                 {/* <span style={{ color: '#c41e3a', fontWeight: 'bold', fontSize: '20px' }}>N</span> */}
//               {/* </div> */}
//               <div className="seller-details">
//                 <div className="seller-name">NEXXA AUTO PARTS</div>
//                 <div className="seller-feedback">100% positive feedback</div>
//               </div>
//             </div>

//             <div className="order-product-card">
//               <div className="product-image-wrapper">
//                 {productData.primaryImage ? (
//                   <img 
//                     src={productData.primaryImage} 
//                     alt={productData.title}
//                     className="order-product-image"
//                     onError={(e) => {
//                       e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
//                     }}
//                   />
//                 ) : (
//                   <div className="order-product-placeholder">📦</div>
//                 )}
//               </div>

//               <div className="product-detail">
//                 <h3 className="product-title">{productData.title}</h3>
//                 {productData.price ? (
//                   <div className="product-price">US ${partPrice.toFixed(2)}</div>
//                 ) : (
//                   <div className="product-price-pending">Price pending</div>
//                 )}

//                 <div className="quantity-selector">
//                   {/* <button 
//                     onClick={() => handleQuantityChange('decrease')}
//                     disabled={orderQuantity === 1}
//                     className="qty-btn"
//                   >
//                     −
//                   </button> */}
//                   <input 
//                     type="number" 
//                     value={orderQuantity} 
//                     readOnly 
//                     className="qty-input"
//                   />
//                   {/* <button 
//                     onClick={() => handleQuantityChange('increase')}
//                     className="qty-btn"
//                   >
//                     +
//                   </button> */}
//                 </div>

//                 <div className="returns-text">Returns accepted</div>
//               </div>
//             </div>
//           </div>

//           {/* Ship To Section */}
//           <div className="ship-to-section">
//             <h2 className="section-title">Ship to</h2>
            
//             <div className="form-group">
//               <select 
//                 name="country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 className="form-select full-width"
//               >
//                 <option value="United States">United States</option>
//                 <option value="Canada">Canada</option>
//                 <option value="Mexico">Mexico</option>
//               </select>
//               <label className="form-label">Contry or region</label>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   placeholder="First name"
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   placeholder="Last name"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="streetAddress"
//                 value={formData.streetAddress}
//                 onChange={handleInputChange}
//                 className="form-input full-width"
//                 placeholder="Street address"
//               />
//             </div>

//             <div className="form-group">
//               <input
//                 type="text"
//                 name="streetAddress2"
//                 value={formData.streetAddress2}
//                 onChange={handleInputChange}
//                 className="form-input full-width"
//                 placeholder="Street address 2 (optional)"
//               />
//             </div>

//             <div className="form-row-three">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   placeholder="City"
//                 />
//               </div>
//               <div className="form-group">
//                 <select
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="">State/Province/Region</option>
//                   <option value="CA">California</option>
//                   <option value="NY">New York</option>
//                   <option value="TX">Texas</option>
//                   {/* Add more states */}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   placeholder="ZIP code"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="form-input full-width"
//                 placeholder="Email"
//               />
//             </div>

//             <div className="form-row-phone">
//               <div className="form-group" style={{width: '150px'}}>
//                 <select
//                   name="countryCode"
//                   value={formData.countryCode}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="US +1">US +1</option>
//                   <option value="CA +1">CA +1</option>
//                   <option value="UK +44">UK +44</option>
//                 </select>
//                 <label className="form-label-small">Contry code</label>
//               </div>
//               <div className="form-group" style={{flex: 1}}>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="form-input full-width"
//                   placeholder="Phone number (required)"
//                 />
//                 <div className="form-hint">We only use this number if there's a shipping issue.</div>
//               </div>
//             </div>

//             <button onClick={handleDone} className="done-btn">
//               Done
//             </button>
//           </div>
//         </div>

//         {/* Order Summary Sidebar */}
//         <div className="order-summary-sidebar">
//           <h2 className="summary-title">Order Summary</h2>
          
//           <div className="summary-row">
//             <span className="summary-label">Part Price</span>
//             <span className="summary-value">${(partPrice * orderQuantity).toFixed(2)}</span>
//           </div>

//           <div className="summary-row">
//             <span className="summary-label">Shipping</span>
//             <span className="summary-value">${shipping}</span>
//           </div>

//           <div className="summary-divider"></div>

//           <div className="summary-row summary-total">
//             <span className="summary-label">Order Summary</span>
//             <span className="summary-value">${totalPrice.toFixed(2)}</span>
//           </div>

//           <button onClick={handleConfirmPay} className="confirm-pay-btn">
//             Confirm and Pay
//           </button>

//           <div className="shipping-address-prompt">
//             Enter shipping address
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './OrderPage.css';
import logoImage from "../assets/images/brands/nexxa logo.png";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.product;
  const quantity = location.state?.quantity || 1;

  const [formData, setFormData] = useState({
    country: 'United States',
    firstName: '',
    lastName: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    countryCode: 'US +1',
    phone: ''
  });

  const [orderQuantity, setOrderQuantity] = useState(quantity);
  const [dynamicPrice, setDynamicPrice] = useState(null);
  const [priceLoading, setPriceLoading] = useState(true);

  // API Configuration (same as ProductPage)
  const API_BASE = 'https://nexxaauto.com/api';

  // Fetch dynamic price from backend (matching ProductPage pattern)
  useEffect(() => {
    const fetchProductPrice = async () => {
      if (!productData?.id) {
        setPriceLoading(false);
        return;
      }

      try {
        setPriceLoading(true);
        
        // Fetch from the same API endpoint as ProductPage
        const response = await fetch(`${API_BASE}/part-galleries/${productData.id}/`);
        
        if (response.ok) {
          const data = await response.json();
          // Extract price the same way as ProductPage
          const backendPrice = data.price || data.part_price || data.selling_price || null;
          setDynamicPrice(backendPrice ? parseFloat(backendPrice) : null);
        } else {
          // If API fails, fall back to productData.price if available
          setDynamicPrice(productData.price || null);
        }
      } catch (error) {
        console.error('Error fetching price:', error);
        // Fall back to productData.price if available
        setDynamicPrice(productData.price || null);
      } finally {
        setPriceLoading(false);
      }
    };

    fetchProductPrice();
  }, [productData?.id, productData?.price]);

  useEffect(() => {
    // If no product data, redirect back to home or previous page
    if (!productData) {
      navigate('/');
    }
  }, [productData, navigate]);

  if (!productData) {
    return (
      <div className="order-loading">
        <p>Loading order details...</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setOrderQuantity(prev => prev + 1);
    } else if (type === 'decrease' && orderQuantity > 1) {
      setOrderQuantity(prev => prev - 1);
    }
  };

  const handleDone = () => {
    // Validate form
    const requiredFields = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'zipCode', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Shipping Address:', formData);
    alert('Shipping address saved! Proceeding to payment...');
  };

  const handleConfirmPay = () => {
    // Check if price is available
    if (!dynamicPrice && !priceLoading) {
      alert('Price is pending. Please wait for price confirmation before proceeding.');
      return;
    }

    // Check if shipping address is filled
    if (!formData.firstName || !formData.email) {
      alert('Please complete the shipping address first');
      return;
    }
    
    alert('Proceeding to payment gateway...');
    // Here you would integrate with your payment gateway
  };

  // Use dynamic price if available, otherwise null
  const partPrice = dynamicPrice ? parseFloat(dynamicPrice) : 0;
  const shipping = productData.shipping || 40;
  const totalPrice = dynamicPrice ? (partPrice * orderQuantity) + shipping : null;

  return (
    <div className="order-page">
      {/* Header */}
      <header className="order-header">
        <Link to="/" className="order-logo-link">
          <img src={logoImage} alt="Nexxa Logo" className="order-logo-img" />
        </Link>
        <button className="order-heart-btn">
          <Heart size={28} stroke="#c41e3a" fill="none" />
        </button>
      </header>

      <div className="order-container">
        <div className="order-main-content">
          {/* Review Order Section */}
          <div className="review-order-section">
            <h2 className="section-title">Review Order</h2>
            
            <div className="seller-info">
              <div className="seller-details">
                <div className="seller-name">NEXXA AUTO PARTS</div>
                <div className="seller-feedback">100% positive feedback</div>
              </div>
            </div>

            <div className="order-product-card">
              <div className="product-image-wrapper">
                {productData.primaryImage ? (
                  <img 
                    src={productData.primaryImage} 
                    alt={productData.title}
                    className="order-product-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <div className="order-product-placeholder">📦</div>
                )}
              </div>

              <div className="product-detail">
                <h3 className="product-title">{productData.title}</h3>
                
                {/* Dynamic Price Display */}
                {priceLoading ? (
                  <div className="product-price-loading">
                    <span className="loading-spinner">⏳</span> Loading price...
                  </div>
                ) : dynamicPrice ? (
                  <div className="product-price">US ${partPrice.toFixed(2)}</div>
                ) : (
                  <div className="product-price-pending">
                    <span style={{ color: '#ff9800' }}>⚠️</span> Price Pending
                  </div>
                )}

                <div className="quantity-selector">
                  <input 
                    type="number" 
                    value={orderQuantity} 
                    readOnly 
                    className="qty-input"
                  />
                </div>

                <div className="returns-text">Returns accepted</div>
              </div>
            </div>
          </div>

          {/* Ship To Section */}
          <div className="ship-to-section">
            <h2 className="section-title">Ship to</h2>
            
            <div className="form-group">
              <select 
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="form-select full-width"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
              </select>
              <label className="form-label">Country or region</label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="First name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="form-input full-width"
                placeholder="Street address"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="streetAddress2"
                value={formData.streetAddress2}
                onChange={handleInputChange}
                className="form-input full-width"
                placeholder="Street address 2 (optional)"
              />
            </div>

            <div className="form-row-three">
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="City"
                />
              </div>
              <div className="form-group">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">State/Province/Region</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  {/* Add more states */}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="ZIP code"
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input full-width"
                placeholder="Email"
              />
            </div>

            <div className="form-row-phone">
              <div className="form-group" style={{width: '150px'}}>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="US +1">US +1</option>
                  <option value="CA +1">CA +1</option>
                  <option value="UK +44">UK +44</option>
                </select>
                <label className="form-label-small">Country code</label>
              </div>
              <div className="form-group" style={{flex: 1}}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input full-width"
                  placeholder="Phone number (required)"
                />
                <div className="form-hint">We only use this number if there's a shipping issue.</div>
              </div>
            </div>

            <button onClick={handleDone} className="done-btn">
              Done
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary-sidebar">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-row">
            <span className="summary-label">Part Price</span>
            {priceLoading ? (
              <span className="summary-value">Loading...</span>
            ) : dynamicPrice ? (
              <span className="summary-value">${(partPrice * orderQuantity).toFixed(2)}</span>
            ) : (
              <span className="summary-value" style={{ color: '#ff9800' }}>Pending</span>
            )}
          </div>

          <div className="summary-row">
            <span className="summary-label">Shipping</span>
            <span className="summary-value">${shipping}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row summary-total">
            <span className="summary-label">Order Total</span>
            {priceLoading ? (
              <span className="summary-value">Calculating...</span>
            ) : totalPrice ? (
              <span className="summary-value">${totalPrice.toFixed(2)}</span>
            ) : (
              <span className="summary-value" style={{ color: '#ff9800' }}>Pending</span>
            )}
          </div>

          <button 
            onClick={handleConfirmPay} 
            className="confirm-pay-btn"
            disabled={!dynamicPrice || priceLoading}
            style={{
              opacity: (!dynamicPrice || priceLoading) ? 0.6 : 1,
              cursor: (!dynamicPrice || priceLoading) ? 'not-allowed' : 'pointer'
            }}
          >
            {priceLoading ? 'Loading Price...' : !dynamicPrice ? 'Price Pending' : 'Confirm and Pay'}
          </button>

          <div className="shipping-address-prompt">
            {!dynamicPrice && !priceLoading ? 
              'Waiting for price confirmation...' : 
              'Enter shipping address'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;