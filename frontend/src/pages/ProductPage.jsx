// import React, { useState, useEffect } from 'react';
// import { Heart, Share2, ChevronLeft, ChevronRight, Package } from 'lucide-react';
// import './ProductPage.css';
// import logoImage from "../assets/images/brands/nexxa logo.png";
// import { Link } from "react-router-dom";


// // API Configuration
// const API_BASE = 'https://nexxaauto.com/api';
// const IMAGE_BASE = 'https://images.nexxaauto.com';
// const R2_DEV_URL = 'https://pub-243a0890b1b15283d9c78a97866ba995.r2.dev';

// // Convert R2.dev URL to custom domain
// const fixImageUrl = (url) => {
//   if (!url) return null;
//   return url.replace(R2_DEV_URL, IMAGE_BASE);
// };

// // Get the first image URL from a gallery object
// const getFirstImageUrl = (gallery) => {
//   if (gallery.primary_image && gallery.primary_image.url) {
//     return fixImageUrl(gallery.primary_image.url);
//   }
//   if (gallery.primary_image && gallery.primary_image.thumbnail) {
//     return fixImageUrl(gallery.primary_image.thumbnail);
//   }
//   if (gallery.images && gallery.images.length > 0) {
//     const firstImage = gallery.images[0];
//     return fixImageUrl(firstImage.image_url || firstImage.url || firstImage.image);
//   }
//   return null;
// };

// // Calculate remaining delivery days based on order date and estimated delivery days
// const calculateRemainingDays = (orderDate, totalDeliveryDays) => {
//   if (!orderDate) return totalDeliveryDays;
  
//   const now = new Date();
//   const ordered = new Date(orderDate);
//   const daysPassed = Math.floor((now - ordered) / (1000 * 60 * 60 * 24));
//   const remainingDays = totalDeliveryDays - daysPassed;
  
//   return Math.max(0, remainingDays);
// };

// const ProductPage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [productImages, setProductImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(0);
//   // const [quantity, setQuantity] = useState(1);
//   const [isWishlist, setIsWishlist] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [loadingImages, setLoadingImages] = useState(false);
//   const [error, setError] = useState(null);
//   const [userZipCode, setUserZipCode] = useState('');

//   // Fetch all images for a specific gallery
//   const fetchGalleryImages = async (galleryId) => {
//     try {
//       setLoadingImages(true);
//       const response = await fetch(`${API_BASE}/part-galleries/${galleryId}/`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch gallery images');
//       }
      
//       const data = await response.json();
      
//       if (data.images && data.images.length > 0) {
//         const images = data.images.map(img => ({
//           url: fixImageUrl(img.image_url || img.url || img.image),
//           thumbnail: fixImageUrl(img.thumbnail_url || img.thumbnail || img.image_url || img.url || img.image)
//         }));
//         setProductImages(images);
//         return images;
//       }
      
//       if (data.primary_image) {
//         const images = [{
//           url: fixImageUrl(data.primary_image.url),
//           thumbnail: fixImageUrl(data.primary_image.thumbnail || data.primary_image.url)
//         }];
//         setProductImages(images);
//         return images;
//       }
      
//       setProductImages([]);
//       return [];
//     } catch (err) {
//       console.error('Error fetching gallery images:', err);
//       setProductImages([]);
//       return [];
//     } finally {
//       setLoadingImages(false);
//     }
//   };

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${API_BASE}/part-galleries/`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
        
//         const data = await response.json();
//         console.log('Full API Response:', data);
        
//         const transformedProducts = data.results.map(item => {
//           console.log('Product item:', item);
//           const primaryImageUrl = getFirstImageUrl(item);
          
//           // Check if price exists in backend, if not set to null
//           const backendPrice = item.price || item.part_price || item.selling_price || null;
          
//           return {
//             id: item.id,
//             title: `${item.year} ${item.manufacturer_name} ${item.model_name} ${item.part_name}`,
//             price: backendPrice ? parseFloat(backendPrice) : null, // Use backend price or null
//             shipping: item.shipping_cost || 70,
//             condition: item.condition || 'Grade A',
//             manufacturer: item.manufacturer_name,
//             model: item.model_name,
//             year: item.year.toString(),
//             primaryImage: primaryImageUrl,
//             description: item.description || 'No description available',
//             returns: '7 days return from the day you receive the product',
//             delivery: item.delivery_estimate || null,
//             partCategory: item.part_category_name,
//             partNumber: item.part_number || 'N/A',
//             slug: item.slug,
//             imageCount: item.image_count || 0,
//             isFeatured: item.is_featured || false,
//             // For shipping countdown - comes from backend when order is placed
//             orderDate: item.order_date || null, // Backend provides this after order
//             estimatedDeliveryDays: item.estimated_delivery_days || 7, // Default 7 days
//             zipCode: item.delivery_zip_code || null,
//             userZipCode: null // For user input
//           };
//         });
        
//         console.log('Transformed Products:', transformedProducts);
//         setAllProducts(transformedProducts);
//         if (transformedProducts.length > 0) {
//           await loadProductWithImages(transformedProducts[0]);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const loadProductWithImages = async (product) => {
//     console.log('Loading product with description:', product.description);
//     setCurrentProduct(product);
//     setSelectedImage(0);
//     await fetchGalleryImages(product.id);
//   };

//   const alternativeProducts = currentProduct
//     ? allProducts.filter(product =>
//         product.id !== currentProduct.id &&
//         product.manufacturer === currentProduct.manufacturer &&
//         product.year === currentProduct.year &&
//         product.partCategory === currentProduct.partCategory
//       )
//     : [];

//   const handlePrevImage = () => {
//     if (productImages.length > 0) {
//       setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
//     }
//   };

//   const handleNextImage = () => {
//     if (productImages.length > 0) {
//       setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
//     }
//   };

//   const handleQuantityChange = (type) => {
//     // if (type === 'increase') {
//     //   setQuantity(prev => prev + 1);
//     // } else if (type === 'decrease' && quantity > 1) {
//     //   setQuantity(prev => prev - 1);
//     // }
//   };

//   const handleBuyNow = () => {
//     if (currentProduct) {
//       if (currentProduct.price) {
//         alert(`Purchasing ${quantity}x ${currentProduct.title} for ${(currentProduct.price * quantity).toFixed(2)}`);
//       } else {
//         alert('Price information is being updated. Please check back soon or contact us for pricing.');
//       }
//     }
//   };

//   const handleWishlist = () => {
//     setIsWishlist(!isWishlist);
//   };

//   // const handleProductChange = async (product) => {
//   //   setQuantity(1);
//   //   setIsWishlist(false);
//   //   setUserZipCode(''); // Reset zipcode when changing products
//   //   await loadProductWithImages(product);
//   //   window.scrollTo({ top: 0, behavior: 'smooth' });
//   // };

//   useEffect(() => {
//     setSelectedImage(0);
//   }, [currentProduct?.id]);

//   if (loading) {
//     return (
//       <div>
//         <header className="nexxa-header">
//           <Link to="/" className="nexxa-logo-link">
//           <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
//           </Link>
//         </header>
//         <div className="nexxa-loading">
//           <div className="nexxa-spinner"></div>
//           <p>Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <header className="nexxa-header">
//           <Link to="/" className="nexxa-logo-link">
//           <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
//           </Link>
//         </header>
//         <div className="nexxa-error">
//           <div className="nexxa-error-card">
//             <p className="nexxa-error-title">Error loading products</p>
//             <p className="nexxa-error-message">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!currentProduct) {
//     return (
//       <div>
//         <header className="nexxa-header">
//           <Link to="/" className="nexxa-logo-link">
//           <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
//           </Link>
//         </header>
//         <div className="nexxa-loading">
//           <p>No products available</p>
//         </div>
//       </div>
//     );
//   }

//   const currentImage = productImages.length > 0 ? productImages[selectedImage] : null;
  
//   // Calculate remaining delivery days
//   const remainingDeliveryDays = calculateRemainingDays(
//     currentProduct.orderDate, 
//     currentProduct.estimatedDeliveryDays
//   );

//   return (
//     <div>
//       <header className="nexxa-header">
//         <Link to="/" className="nexxa-logo-link">
//         <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
//         </Link>
//         <button onClick={handleWishlist} className="nexxa-heart-btn">
//           <Heart
//             fill={isWishlist ? '#ff4757' : 'none'}
//             stroke={isWishlist ? '#ff4757' : '#fff'}
//             size={28}
//           />
//         </button>
//       </header>

//       <div className="nexxa-container">
//         <div className="nexxa-product-grid">
//           <div className="nexxa-image-section">
//             {loadingImages ? (
//               <div className="nexxa-thumbnails">
//                 <div className="nexxa-thumbnail" style={{backgroundColor: '#e0e0e0'}}></div>
//                 <div className="nexxa-thumbnail" style={{backgroundColor: '#e0e0e0'}}></div>
//                 <div className="nexxa-thumbnail" style={{backgroundColor: '#e0e0e0'}}></div>
//               </div>
//             ) : productImages.length > 0 ? (
//               <div className="nexxa-thumbnails">
//                 {productImages.map((img, index) => (
//                   <div
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`nexxa-thumbnail ${selectedImage === index ? 'active' : ''}`}
//                   >
//                     <img
//                       src={img.thumbnail}
//                       alt={`View ${index + 1}`}
//                       onError={(e) => {
//                         e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23f0f0f0" width="80" height="80"/%3E%3C/svg%3E';
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : null}

//             <div className="nexxa-main-image-container">
//               {productImages.length > 1 && (
//                 <button onClick={handlePrevImage} className="nexxa-nav-btn left">
//                   <ChevronLeft size={32} />
//                 </button>
//               )}
              
//               <div className="nexxa-main-image">
//                 {loadingImages ? (
//                   <div className="nexxa-spinner"></div>
//                 ) : currentImage ? (
//                   <img
//                     src={currentImage.url}
//                     alt="Main product view"
//                     onError={(e) => {
//                       e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3C/svg%3E';
//                     }}
//                   />
//                 ) : (
//                   <Package size={64} style={{color: '#ccc'}} />
//                 )}
//               </div>

//               {productImages.length > 1 && (
//                 <button onClick={handleNextImage} className="nexxa-nav-btn right">
//                   <ChevronRight size={32} />
//                 </button>
//               )}

//               {productImages.length > 0 && (
//                 <div className="nexxa-image-counter">
//                   {selectedImage + 1} / {productImages.length}
//                 </div>
//               )}
//             </div>

//             <button className="nexxa-share-btn">
//               <Share2 size={18} />
//               Share
//             </button>
//           </div>

//           <div className="nexxa-details-section">
//             <h1 className="nexxa-title">{currentProduct.title}</h1>

//             {/* DESCRIPTION SECTION */}
//             {currentProduct.description && currentProduct.description !== 'No description available' && (
//               <div className="nexxa-description-box">
//                 <p className="nexxa-description-text">{currentProduct.description}</p>
//               </div>
//             )}

//             {/* PRICE SECTION - Now from backend */}
//             {currentProduct.price ? (
//               <div className="nexxa-price">${(currentProduct.price * quantity).toFixed(0)}</div>
//             ) : (
//               <div className="nexxa-price" style={{color: '#999', fontSize: '18px', fontStyle: 'italic'}}>
//                 Price will be updated soon
//               </div>
//             )}

//             <div className="nexxa-info-row">
//               <span className="nexxa-info-label">Condition :</span>
//               <span className="nexxa-condition-badge">{currentProduct.condition}</span>
//             </div>

//             {/* QUANTITY SECTION - Moved below condition */}
          

//             {/* ZIPCODE SECTION - Below quantity */}
//             <div className="nexxa-section">
//               <div className="nexxa-section-title">Zip Code:</div>
//               <div className="nexxa-section-content">
//                 <input
//                   type="text"
//                   placeholder="Enter your zip code"
//                   value={userZipCode}
//                   onChange={(e) => setUserZipCode(e.target.value)}
//                   className="nexxa-quantity-input"
//                   style={{width: '200px', padding: '8px'}}
//                 />
//                 {userZipCode && (
//                   <p style={{fontSize: '14px', color: '#1976d2', marginTop: '8px'}}>
//                     Delivering to: {userZipCode}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <button onClick={handleBuyNow} className="nexxa-buy-btn">
//               Buy It Now
//             </button>

//             <button onClick={handleWishlist} className="nexxa-watchlist-btn">
//               <Heart
//                 size={20}
//                 fill={isWishlist ? '#c41e3a' : 'none'}
//                 stroke={isWishlist ? '#c41e3a' : '#333'}
//               />
//               Add to Whatchlist
//             </button>

//             <div className="nexxa-info-card">
//               <Package size={20} style={{color: '#1976d2', flexShrink: 0}} />
//               <span className="nexxa-info-card-text">Breathe easy. Returns accepted.</span>
//             </div>

//             {/* SHIPPING SECTION */}
//             <div className="nexxa-section">
//               <div className="nexxa-section-title">Shipping:</div>
//               <div className="nexxa-section-content">
//                 <p>Economy International Shipping.</p>
//                 {currentProduct.orderDate ? (
//                   <p style={{fontSize: '16px', fontWeight: '600', color: '#1976d2', marginTop: '8px'}}>
//                     {remainingDeliveryDays > 0 
//                       ? `Estimated delivery in ${remainingDeliveryDays} ${remainingDeliveryDays === 1 ? 'day' : 'days'}`
//                       : 'Your order should arrive today or has been delivered!'
//                     }
//                   </p>
//                 ) : (
//                   <p style={{fontSize: '16px', fontWeight: '600', color: '#666', marginTop: '8px'}}>
//                     Delivery time will be calculated after order placement
//                   </p>
//                 )}
//                 <a className="nexxa-link">See details...</a>
//                 <p style={{fontSize: '14px', color: '#999', marginTop: '8px'}}>
//                   International shipment of items may be subject to customs processing and additional charges.
//                 </p>
//               </div>
//             </div>

//             {/* DELIVERY SECTION */}
//             <div className="nexxa-section">
//               <div className="nexxa-section-title">Delivery:</div>
//               <div className="nexxa-section-content">
//                 {currentProduct.orderDate ? (
//                   <p>
//                     {remainingDeliveryDays > 0 
//                       ? `Expected delivery in ${remainingDeliveryDays} ${remainingDeliveryDays === 1 ? 'day' : 'days'} to ${userZipCode || currentProduct.zipCode || 'your location'}`
//                       : `Your order should have been delivered to ${userZipCode || currentProduct.zipCode || 'your location'}`
//                     }
//                   </p>
//                 ) : (
//                   <p style={{color: '#666'}}>
//                     {currentProduct.delivery || 'Delivery details will be available after order confirmation'}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* RETURNS SECTION - Updated text */}
//             <div className="nexxa-section">
//               <div className="nexxa-section-title">Returns:</div>
//               <div className="nexxa-section-content">
//                 <p>12 days return from the day you receive the product. Return shipping included.</p>
//                 <a className="nexxa-link">See details...</a>
//               </div>
//             </div>

//             <div className="nexxa-section">
//               <div className="nexxa-section-title">Payments:</div>
//               <div className="nexxa-payment-icons">
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="nexxa-payment-icon" />
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="nexxa-payment-icon" />
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="nexxa-payment-icon" />
//               </div>
//             </div>

//             <div className="nexxa-section">
//               <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '16px'}}>Shop with confidence</h3>
//               <div className="nexxa-section-title">Returns:</div>
//               <div className="nexxa-section-content">
//                 <p>With zero return shipping fee.</p>
//                 <a className="nexxa-link">See details...</a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ALTERNATIVE PRODUCTS */}
//         {alternativeProducts.length > 0 && (
//           <div className="nexxa-alternative-section">
//             <div className="nexxa-alternative-header">
//               <h2 className="nexxa-alternative-title">Alternative Spec</h2>
//               <a href="#" className="nexxa-see-all"> ({alternativeProducts.length} Specs)</a>
//             </div>

//             <div className="nexxa-alternative-grid">
//               {alternativeProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   onClick={() => handleProductChange(product)}
//                   className="nexxa-alternative-card"
//                 >
//                   <div className="nexxa-alternative-image">
//                     {product.primaryImage ? (
//                       <img
//                         src={product.primaryImage}
//                         alt={product.title}
//                         onError={(e) => {
//                           e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3C/svg%3E';
//                         }}
//                       />
//                     ) : (
//                       <div style={{fontSize: '48px'}}>📦</div>
//                     )}
//                   </div>
//                   <div className="nexxa-alternative-body">
//                     <span className="nexxa-alternative-year">{product.year}</span>
//                     <h3 className="nexxa-alternative-name">{product.title}</h3>
//                     <p className="nexxa-alternative-condition">{product.condition}</p>
//                     {product.price ? (
//                       <>
//                         <div className="nexxa-alternative-price">${product.price.toFixed(2)}</div>
//                         <div className="nexxa-alternative-shipping">+ ${product.shipping}.00 shipping</div>
//                       </>
//                     ) : (
//                       <div className="nexxa-alternative-price" style={{fontSize: '14px', color: '#999', fontStyle: 'italic'}}>
//                         Price coming soon
//                       </div>
//                     )}
//                     <p className="nexxa-alternative-seller">Seller with 100% positive feedback</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
// ============================================================================================
import React, { useState, useEffect } from 'react';
import { Heart, Share2, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import './ProductPage.css';
import logoImage from "../assets/images/brands/nexxa logo.png";
import AuthModal from "../components/AuthModal";


// API Configuration
const API_BASE = 'https://nexxaauto.com/api';
const IMAGE_BASE = 'https://images.nexxaauto.com';
const R2_DEV_URL = 'https://pub-243a0890b1b15283d9c78a97866ba995.r2.dev';

// Convert R2.dev URL to custom domain
const fixImageUrl = (url) => {
  if (!url) return null;
  return url.replace(R2_DEV_URL, IMAGE_BASE);
};

// Get the first image URL from a gallery object
const getFirstImageUrl = (gallery) => {
  if (gallery.primary_image && gallery.primary_image.url) {
    return fixImageUrl(gallery.primary_image.url);
  }
  if (gallery.primary_image && gallery.primary_image.thumbnail) {
    return fixImageUrl(gallery.primary_image.thumbnail);
  }
  if (gallery.images && gallery.images.length > 0) {
    const firstImage = gallery.images[0];
    return fixImageUrl(firstImage.image_url || firstImage.url || firstImage.image);
  }
  return null;
};

// Calculate remaining delivery days
const calculateRemainingDays = (orderDate, totalDeliveryDays) => {
  if (!orderDate) return totalDeliveryDays;
  const now = new Date();
  const ordered = new Date(orderDate);
  const daysPassed = Math.floor((now - ordered) / (1000 * 60 * 60 * 24));
  const remainingDays = totalDeliveryDays - daysPassed;
  return Math.max(0, remainingDays);
};

// Check if user is authenticated
const isUserAuthenticated = () => {
  const token = localStorage.getItem('nexxaToken');
  const user = localStorage.getItem('nexxaUser');
  return token && user;
};

const ProductPage = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [error, setError] = useState(null);
  const [userZipCode, setUserZipCode] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Fetch all images for a specific gallery
  const fetchGalleryImages = async (galleryId) => {
    try {
      setLoadingImages(true);
      const response = await fetch(`${API_BASE}/part-galleries/${galleryId}/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      
      const data = await response.json();
      
      if (data.images && data.images.length > 0) {
        const images = data.images.map(img => ({
          url: fixImageUrl(img.image_url || img.url || img.image),
          thumbnail: fixImageUrl(img.thumbnail_url || img.thumbnail || img.image_url || img.url || img.image)
        }));
        setProductImages(images);
        return images;
      }
      
      if (data.primary_image) {
        const images = [{
          url: fixImageUrl(data.primary_image.url),
          thumbnail: fixImageUrl(data.primary_image.thumbnail || data.primary_image.url)
        }];
        setProductImages(images);
        return images;
      }
      
      setProductImages([]);
      return [];
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setProductImages([]);
      return [];
    } finally {
      setLoadingImages(false);
    }
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/part-galleries/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        const transformedProducts = data.results.map(item => {
          const primaryImageUrl = getFirstImageUrl(item);
          const backendPrice = item.price || item.part_price || item.selling_price || null;
          
          return {
            id: item.id,
            title: `${item.year} ${item.manufacturer_name} ${item.model_name} ${item.part_name}`,
            price: backendPrice ? parseFloat(backendPrice) : null,
            shipping: item.shipping_cost || 40,
            condition: item.condition || 'Grade A',
            manufacturer: item.manufacturer_name,
            model: item.model_name,
            year: item.year.toString(),
            primaryImage: primaryImageUrl,
            description: item.description || 'No description available',
            returns: '12 days return from the day you receive the product',
            delivery: item.delivery_estimate || null,
            partCategory: item.part_category_name,
            partNumber: item.part_number || 'N/A',
            slug: item.slug,
            imageCount: item.image_count || 0,
            isFeatured: item.is_featured || false,
            orderDate: item.order_date || null,
            estimatedDeliveryDays: item.estimated_delivery_days || 7,
            zipCode: item.delivery_zip_code || null,
          };
        });
        
        setAllProducts(transformedProducts);
        if (transformedProducts.length > 0) {
          await loadProductWithImages(transformedProducts[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadProductWithImages = async (product) => {
    setCurrentProduct(product);
    setSelectedImage(0);
    await fetchGalleryImages(product.id);
  };

  const alternativeProducts = currentProduct
    ? allProducts.filter(product =>
        product.id !== currentProduct.id &&
        product.manufacturer === currentProduct.manufacturer &&
        product.year === currentProduct.year &&
        product.partCategory === currentProduct.partCategory
      )
    : [];

  const handlePrevImage = () => {
    if (productImages.length > 0) {
      setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (productImages.length > 0) {
      setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    }
  };

  const handleBuyNow = () => {
    if (!currentProduct) return;

    // Check if user is authenticated
    if (!isUserAuthenticated()) {
      // Store the pending navigation data
      setPendingNavigation({
        product: currentProduct,
        quantity: 1
      });
      // Show auth modal
      setShowAuthModal(true);
      return;
    }

    // If authenticated, navigate directly to order page
    navigate('/order', {
      state: {
        product: currentProduct,
        quantity: 1
      }
    });
  };

  const handleAuthSuccess = (userData) => {
    console.log('User authenticated:', userData);
    setShowAuthModal(false);
    
    // If there was a pending navigation, proceed with it
    if (pendingNavigation) {
      navigate('/order', {
        state: pendingNavigation
      });
      setPendingNavigation(null);
    }
  };

  const handleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  const handleProductChange = async (product) => {
    setIsWishlist(false);
    setUserZipCode('');
    await loadProductWithImages(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setSelectedImage(0);
  }, [currentProduct?.id]);

  if (loading) {
    return (
      <div>
        <header className="nexxa-header">
          <Link to="/" className="nexxa-logo-link">
            <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
          </Link>
        </header>
        <div className="nexxa-loading">
          <div className="nexxa-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <header className="nexxa-header">
          <Link to="/" className="nexxa-logo-link">
            <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
          </Link>
        </header>
        <div className="nexxa-error">
          <div className="nexxa-error-card">
            <p className="nexxa-error-title">Error loading products</p>
            <p className="nexxa-error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div>
        <header className="nexxa-header">
          <Link to="/" className="nexxa-logo-link">
            <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
          </Link>
        </header>
        <div className="nexxa-loading">
          <p>No products available</p>
        </div>
      </div>
    );
  }

  const currentImage = productImages.length > 0 ? productImages[selectedImage] : null;
  const remainingDeliveryDays = calculateRemainingDays(
    currentProduct.orderDate, 
    currentProduct.estimatedDeliveryDays
  );

  return (
    <div>
      <header className="nexxa-header">
        <Link to="/" className="nexxa-logo-link">
          <img src={logoImage} alt="Nexxa Logo" className="nexxa-logo-img" />
        </Link>
        <button onClick={handleWishlist} className="nexxa-heart-btn">
          <Heart
            fill={isWishlist ? '#ff4757' : 'none'}
            stroke={isWishlist ? '#ff4757' : '#fff'}
            size={28}
          />
        </button>
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <div className="nexxa-container">
        <div className="nexxa-product-grid">
          <div className="nexxa-image-section">
            {loadingImages ? (
              <div className="nexxa-thumbnails">
                <div className="nexxa-thumbnail" style={{backgroundColor: '#e0e0e0'}}></div>
                <div className="nexxa-thumbnail" style={{backgroundColor: '#e0e0e0'}}></div>
                <div className="nexxa-thumbnail" style={{backgroundColor: '#e0e0e0'}}></div>
              </div>
            ) : productImages.length > 0 ? (
              <div className="nexxa-thumbnails">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`nexxa-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  >
                    <img
                      src={img.thumbnail}
                      alt={`View ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23f0f0f0" width="80" height="80"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="nexxa-main-image-container">
              {productImages.length > 1 && (
                <button onClick={handlePrevImage} className="nexxa-nav-btn left">
                  <ChevronLeft size={32} />
                </button>
              )}
              
              <div className="nexxa-main-image">
                {loadingImages ? (
                  <div className="nexxa-spinner"></div>
                ) : currentImage ? (
                  <img
                    src={currentImage.url}
                    alt="Main product view"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <Package size={64} style={{color: '#ccc'}} />
                )}
              </div>

              {productImages.length > 1 && (
                <button onClick={handleNextImage} className="nexxa-nav-btn right">
                  <ChevronRight size={32} />
                </button>
              )}

              {productImages.length > 0 && (
                <div className="nexxa-image-counter">
                  {selectedImage + 1} / {productImages.length}
                </div>
              )}
            </div>

            <button className="nexxa-share-btn">
              <Share2 size={18} />
              Share
            </button>
          </div>

          <div className="nexxa-details-section">
            <h1 className="nexxa-title">{currentProduct.title}</h1>

            {currentProduct.description && currentProduct.description !== 'No description available' && (
              <div className="nexxa-description-box">
                <p className="nexxa-description-text">{currentProduct.description}</p>
              </div>
            )}

            {currentProduct.price ? (
              <div className="nexxa-price">${currentProduct.price.toFixed(2)}</div>
            ) : (
              <div className="nexxa-price" style={{color: '#999', fontSize: '18px', fontStyle: 'italic'}}>
                Price will be updated soon
              </div>
            )}

            <div className="nexxa-info-row">
              <span className="nexxa-info-label">Condition :</span>
              <span className="nexxa-condition-badge">{currentProduct.condition}</span>
            </div>

            <div className="nexxa-section">
              <div className="nexxa-section-title">Zip Code:</div>
              <div className="nexxa-section-content">
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  value={userZipCode}
                  onChange={(e) => setUserZipCode(e.target.value)}
                  className="nexxa-quantity-input"
                  style={{width: '200px', padding: '8px'}}
                />
                {userZipCode && (
                  <p style={{fontSize: '14px', color: '#1976d2', marginTop: '8px'}}>
                    Delivering to: {userZipCode}
                  </p>
                )}
              </div>
            </div>

            <button onClick={handleBuyNow} className="nexxa-buy-btn">
              Buy It Now
            </button>

            <button onClick={handleWishlist} className="nexxa-watchlist-btn">
              <Heart
                size={20}
                fill={isWishlist ? '#c41e3a' : 'none'}
                stroke={isWishlist ? '#c41e3a' : '#333'}
              />
              Add to Whatchlist
            </button>

            <div className="nexxa-info-card">
              <Package size={20} style={{color: '#1976d2', flexShrink: 0}} />
              <span className="nexxa-info-card-text">Breathe easy. Returns accepted.</span>
            </div>

            <div className="nexxa-section">
              <div className="nexxa-section-title">Shipping:</div>
              <div className="nexxa-section-content">
                <p>Economy International Shipping.</p>
                {currentProduct.orderDate ? (
                  <p style={{fontSize: '16px', fontWeight: '600', color: '#1976d2', marginTop: '8px'}}>
                    {remainingDeliveryDays > 0 
                      ? `Estimated delivery in ${remainingDeliveryDays} ${remainingDeliveryDays === 1 ? 'day' : 'days'}`
                      : 'Your order should arrive today or has been delivered!'
                    }
                  </p>
                ) : (
                  <p style={{fontSize: '16px', fontWeight: '600', color: '#666', marginTop: '8px'}}>
                    Delivery time will be calculated after order placement
                  </p>
                )}
                <a className="nexxa-link">See details...</a>
              </div>
            </div>

            <div className="nexxa-section">
              <div className="nexxa-section-title">Delivery:</div>
              <div className="nexxa-section-content">
                <p style={{color: '#666'}}>
                  {currentProduct.delivery || 'Delivery details will be available after order confirmation'}
                </p>
              </div>
            </div>

            <div className="nexxa-section">
              <div className="nexxa-section-title">Returns:</div>
              <div className="nexxa-section-content">
                <p>{currentProduct.returns}</p>
                <a className="nexxa-link">See details...</a>
              </div>
            </div>

            <div className="nexxa-section">
              <div className="nexxa-section-title">Payments:</div>
              <div className="nexxa-payment-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="nexxa-payment-icon" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="nexxa-payment-icon" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="nexxa-payment-icon" />
              </div>
            </div>

            <div className="nexxa-section">
              <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '16px'}}>Shop with confidence</h3>
              <div className="nexxa-section-title">Returns:</div>
              <div className="nexxa-section-content">
                <p>With zero return shipping fee.</p>
                <a className="nexxa-link">See details...</a>
              </div>
            </div>
          </div>
        </div>

        {alternativeProducts.length > 0 && (
          <div className="nexxa-alternative-section">
            <div className="nexxa-alternative-header">
              <h2 className="nexxa-alternative-title">Alternative Spec</h2>
              <a href="#" className="nexxa-see-all">({alternativeProducts.length} Specs)</a>
            </div>

            <div className="nexxa-alternative-grid">
              {alternativeProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductChange(product)}
                  className="nexxa-alternative-card"
                >
                  <div className="nexxa-alternative-image">
                    {product.primaryImage ? (
                      <img
                        src={product.primaryImage}
                        alt={product.title}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div style={{fontSize: '48px'}}>📦</div>
                    )}
                  </div>
                  <div className="nexxa-alternative-body">
                    <span className="nexxa-alternative-year">{product.year}</span>
                    <h3 className="nexxa-alternative-name">{product.title}</h3>
                    <p className="nexxa-alternative-condition">{product.condition}</p>
                    {product.price ? (
                      <>
                        <div className="nexxa-alternative-price">${product.price.toFixed(2)}</div>
                        <div className="nexxa-alternative-shipping">+ ${product.shipping}.00 shipping</div>
                      </>
                    ) : (
                      <div className="nexxa-alternative-price" style={{fontSize: '14px', color: '#999', fontStyle: 'italic'}}>
                        Price coming soon
                      </div>
                    )}
                    <p className="nexxa-alternative-seller">Seller with 100% positive feedback</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;