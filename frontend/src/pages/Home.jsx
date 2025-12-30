import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Import Images
import bannerImage from "../assets/images/banner-img.webp";
import part1 from "../assets/images/Anti Brake Module-Pump.webp";
import part2 from "../assets/images/Radio controller- Display.webp";
import part3 from "../assets/images/Display.webp";
import part4 from "../assets/images/Mechanical Parts.webp";
import part5 from "../assets/images/Body Parts.webp";
import part6 from "../assets/images/transmission.webp";
import part7 from "../assets/images/Engine Computers.webp";
// import part8 from "../assets/images/Engine.webp";
import part9 from "../assets/images/Engines.webp";
import part10 from "../assets/images/Rims.webp";

// Brand Images
import brand1 from "../assets/images/brands/Group 50.png";
import brand2 from "../assets/images/brands/Group 52.png";
import brand3 from "../assets/images/brands/Group 53.png";
import brand4 from "../assets/images/brands/Group 54.png";
import brand5 from "../assets/images/brands/Group 55.png";
import brand6 from "../assets/images/brands/Group 56.png";
import brand7 from "../assets/images/brands/Group 57.png";
import brand8 from "../assets/images/brands/Group 58.png";
import brand9 from "../assets/images/brands/Group 59.png";
import brand10 from "../assets/images/brands/Group 60.png";
import brand11 from "../assets/images/brands/Group 61.png";


// why nexxa images
import headset from "../assets/images/icons/Headset.svg";
import lowMileage from "../assets/images/icons/Tumble Dry Low Heat.svg";
import delivery from "../assets/images/icons/Document Delivery.svg";
import radiator from "../assets/images/icons/Car Radiator.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";

// API Configuration

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
console.log("API Base URL:", API_BASE_URL);

// Parts images array
// Parts images array with names
const partsImages = [
  { img: part1, name: "Anti Brake Module Pump" },
  { img: part2, name: "Radio Controller Display" },
  { img: part3, name: "Display Unit" },
  { img: part4, name: "Mechanical Parts" },
  { img: part5, name: "Body Parts" },
  { img: part6, name: "Transmission" },
  { img: part7, name: "Engine Computers" },
  // { img: part8, name: "Engine" },
  { img: part9, name: "Engines" },
  { img: part10, name: "Rims" },
];


// Brands array
const brands = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand7,
  brand8,
  brand9,
  brand10,
  brand11,
];

const Home = () => {
  const navigate = useNavigate();
  const scrollRef = React.useRef(null);

  // Form selections state
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPart, setSelectedPart] = useState("");

  // Backend data state
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [partCategories, setPartCategories] = useState([]);

  // Loading states
  const [loadingManufacturers, setLoadingManufacturers] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingParts, setLoadingParts] = useState(true);
  const [error, setError] = useState(null);

  // Fetch manufacturers on mount
  useEffect(() => {
    fetchManufacturers();
    fetchPartCategories();
  }, []);

  // Fetch models when manufacturer changes
  useEffect(() => {
    if (selectedManufacturer) {
      fetchModelsByManufacturer(selectedManufacturer);
    } else {
      setModels([]);
      setSelectedModel("");
    }
  }, [selectedManufacturer]);

  const fetchManufacturers = async () => {
    try {
      setLoadingManufacturers(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/manufacturers/`);
      const data = await response.json();

      if (data.success && data.data) {
        setManufacturers(data.data);
      } else {
        throw new Error("Failed to load manufacturers");
      }
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      setError("Failed to load manufacturers. Please refresh the page.");
    } finally {
      setLoadingManufacturers(false);
    }
  };

  const fetchModelsByManufacturer = async (manufacturerId) => {
    try {
      setLoadingModels(true);

      const response = await fetch(
        `${API_BASE_URL}/manufacturers/${manufacturerId}/models/`,
      );
      const data = await response.json();

      if (data.success && data.data) {
        setModels(data.data);
      } else {
        throw new Error("Failed to load models");
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      alert("Failed to load models. Please try again.");
    } finally {
      setLoadingModels(false);
    }
  };

  const fetchPartCategories = async () => {
    try {
      setLoadingParts(true);

      const response = await fetch(`${API_BASE_URL}/part-categories/`);
      const data = await response.json();

      if (data.success && data.data) {
        setPartCategories(data.data);
      } else {
        throw new Error("Failed to load part categories");
      }
    } catch (error) {
      console.error("Error fetching part categories:", error);
      setError("Failed to load part categories. Please refresh the page.");
    } finally {
      setLoadingParts(false);
    }
  };

  const handleManufacturerChange = (e) => {
    const value = e.target.value;
    setSelectedManufacturer(value);
    setSelectedModel(""); // Reset model when manufacturer changes
  };

  const handleSearch = () => {
    // Validation
    if (!selectedYear) {
      alert("Please select a year");
      return;
    }
    if (!selectedManufacturer) {
      alert("Please select a manufacturer");
      return;
    }
    if (!selectedModel) {
      alert("Please select a model");
      return;
    }
    if (!selectedPart) {
      alert("Please select a part category");
      return;
    }

    // Find the selected items' details
    const manufacturerData = manufacturers.find(
      (m) => m.id === parseInt(selectedManufacturer),
    );
    const modelData = models.find((m) => m.id === parseInt(selectedModel));
    const partData = partCategories.find(
      (p) => p.id === parseInt(selectedPart),
    );

    // Navigate to product details page with complete data
    navigate("/product-details", {
      state: {
        year: parseInt(selectedYear),
        manufacturerId: parseInt(selectedManufacturer),
        manufacturerName: manufacturerData?.name || "",
        modelId: parseInt(selectedModel),
        modelName: modelData?.name || "",
        partCategoryId: parseInt(selectedPart),
        partCategoryName: partData?.name || "",
      },
    });
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === "left") current.scrollLeft -= 300;
      else current.scrollLeft += 300;
    }
  };

  // Generate years array (1990 to current year + 1)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1989 },
    (_, i) => currentYear + 1 - i,
  );

  return (
    <div>
      {/* Error Message */}
      {error && (
        <div
          style={{
            background: "#fee",
            color: "#c00",
            padding: "15px",
            textAlign: "center",
            borderBottom: "2px solid #c00",
          }}
        >
          {error}
        </div>
      )}

      {/* Banner Section with Search Form */}
      <section
        className="banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="banner-overlay"></div>
        <div className="banner-gradient"></div>

        <div className="banner-inner">
         <div className="banner-left">
          <h1>Millions of <span className="highlight">OEM Parts.</span> <br />Matched to Your Vehicle.</h1>
          <p>One smart search. Your perfect fit starts here.</p>
          </div>
          <div className="banner-right">
            <div className="banner-form">
              <div className="row">
                {/* Year Selector */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  aria-label="Select Year"
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                {/* Manufacturer Selector */}
                <select
                  value={selectedManufacturer}
                  onChange={handleManufacturerChange}
                  disabled={loadingManufacturers}
                  aria-label="Select Manufacturer"
                >
                  <option value="">
                    {loadingManufacturers ? "Loading..." : "Make"}
                  </option>
                  {manufacturers.map((mfg) => (
                    <option key={mfg.id} value={mfg.id}>
                      {mfg.name}
                    </option>
                  ))}
                </select>

                {/* Model Selector */}
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedManufacturer || loadingModels}
                  aria-label="Select Model"
                >
                  <option value="">
                    {loadingModels
                      ? "Loading..."
                      : !selectedManufacturer
                        ? "Model"
                        : "Model"}
                  </option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Part Category Selector */}
              <select
                className="full"
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
                disabled={loadingParts}
                aria-label="Select Part Category"
              >
                <option value="">
                  {loadingParts ? "Loading..." : "Parts "}
                </option>
                {partCategories.map((part) => (
                  <option key={part.id} value={part.id}>
                    {part.name}
                  </option>
                ))}
              </select>

              <button type="button" onClick={handleSearch}>
                Search Now
              </button>
            </div>
            <p className="vin-link">
              Don't know your vehicle? <a href="#vin">Enter VIN</a>
            </p>
          </div>
        </div>
      </section>

      {/* Why Nexxa Auto Parts Section */}
      <section className="why-nexxa">
  <div className="why-nexxa-container">
    <h3 className="why-title">Why Nexxa Auto Parts</h3>
    <div className="why-boxes">
      <div className="why-box">
        <img src={headset} alt="Free expert support" />
        <span>Free expert support</span>
      </div>
      <div className="why-box">
        <img src={lowMileage} alt="Low mileage parts" />
        <span>Low mileage parts</span>
      </div>
      <div className="why-box">
        <img src={delivery} alt="Nationwide shipping" />
        <span>Nationwide shipping</span>
      </div>
      <div className="why-box">
        <img src={radiator} alt="VIN-matched parts" />
        <span>VIN-matched parts</span>
      </div>
    </div>
  </div>
</section>



      {/* Explore Our Premium Used Auto Parts */}
      <section className="explore-parts">
        <h2>
          Explore Our <span className="highlight">Premium</span> Used Auto Parts
        </h2>
        <div className="scroll-wrapper">
          <button className="scroll-btn left" onClick={() => scroll("left")}>
            <ChevronLeft />
          </button>
          <div className="cards-container" ref={scrollRef}>
            {partsImages.map((part, idx) => (
              <div className="part-card" key={idx}>
                <img src={part.img} alt={part.name} />
                <p className="part-name">{part.name}</p>
                </div>
              ))}

          </div>
          <button className="scroll-btn right" onClick={() => scroll("right")}>
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-header">
              <span className="icon">🔍</span>
              <h3>Find Your Part</h3>
            </div>
            <p>
              Search our extensive inventory by entering your vehicle details
              and part requirements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <span className="icon">💬</span>
              <h3>Get a Quote</h3>
            </div>
            <p>
              Receive a competitive quote with detailed information about part
              condition and warranty.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <span className="icon">🚚</span>
              <h3>Fast Shipping</h3>
            </div>
            <p>
              We ship your part quickly with nationwide delivery and tracking
              information.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <span className="icon">🛡️</span>
              <h3>Warranty Support</h3>
            </div>
            <p>
              Enjoy peace of mind with standard warranty and responsive customer
              service.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="customer-reviews">
        <h2>
          What Our <span>Customers Say</span>
        </h2>
        <div className="reviews-slider">
          <div className="reviews-track">
            {[
              {
                name: "Rahul Menon",
                review: "Quality parts and fast delivery. Highly recommended!",
              },
              {
                name: "Anjali Krishnan",
                review: "Customer support was very helpful and polite.",
              },
              {
                name: "Arjun Nair",
                review: "Perfect fit for my car. Saved a lot of money.",
              },
              {
                name: "Sreejith Kumar",
                review: "Smooth experience from search to delivery.",
              },
              {
                name: "Neha Sharma",
                review: "Packaging was excellent and product was genuine.",
              },
            ].map((item, index) => (
              <div className="review-card" key={index}>
                <div className="review-header">
                  <span className="user-icon">👤</span>
                  <h4>{item.name}</h4>
                </div>
                <span className="review-time">2 weeks ago</span>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">{item.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <h2>Brands We Carry</h2>
        <p>We stock parts for all major automotive brands</p>
        <div className="brands-marquee">
          <div className="brands-track">
            {brands.map((brand, idx) => (
              <div className="brand-card" key={idx}>
                <img src={brand} alt={`Brand ${idx + 1}`} />
              </div>
            ))}
            {/* Duplicate for smooth infinite scroll */}
            {brands.map((brand, idx) => (
              <div className="brand-card" key={`dup-${idx}`}>
                <img src={brand} alt={`Brand ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
