import React from "react";
import "./Home.css";
import bannerImage from "../assets/images/banner-img.webp";
import ctaImage from "../assets/images/group-104.svg";
// import img1 from "../assets/images/group-193.svg";
// import img2 from "../assets/images/low-milage.svg";
// import img3 from "../assets/images/national-wide.svg";
// import img4 from "../assets/images/win.svg";
import part1 from "../assets/images/Anti Brake Module-Pump.webp";
import part2 from "../assets/images/Radio controller- Display.webp";
import part3 from "../assets/images/Display.webp";
import part4 from "../assets/images/Mechanical Parts.webp";
import part5 from "../assets/images/Body Parts.webp";
import part6 from "../assets/images/transmission.webp";
import part7 from "../assets/images/Engine Computers.webp";
import part8 from "../assets/images/Engine.webp";
import part9 from "../assets/images/Engines.webp";
import part10 from "../assets/images/Rims.webp";
// branda section image
import brand1 from "../assets/images/brands/Group 50.png";
import brand2 from "../assets/images/brands/Group 52.png";
import brand3 from "../assets/images/brands/Group 53.png";
import brand4 from "../assets/images/brands/Group 54.png";
import brand5 from "../assets/images/brands/Group 55.png";

import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [brand1, brand2, brand3, brand4, brand5];

// Manufacturer-Model mapping
const vehicleData = {
  Buick: ["Allure", "Century", "Electra", "Enclave", "Lacrosse", "Lesabre", "Lucerne", "Park Avenue", "Rainier", "Reatta", "Regal", "Riviera", "Roadmaster", "Skyhawk", "Skylark", "Somerset", "Terraza", "Rendezvous", "ENCORE"],
  Cadillac: ["XTS", "Allante", "Brougham", "Catera", "Cimarron", "CTS", "Deville", "DTS", "Eldorado", "Escalade", "Escalade ESV", "Escalade EXT", "Fleetwood", "Seville", "SRX", "STS", "XLR", "ATS", "ELR"],
  Chevy: ["Spark", "Caprice SS", "TRAX", "Volt", "2500 Pickup", "30 Pickup", "3100 Pickup", "3500 Pickup", "3600 Pickup", "3800 Pickup", "Astro", "Avalanche 1500", "Avalanche 2500", "Aveo", "Beretta", "Camaro", "Caprice", "Cavalier", "Celebrity", "Chevelle", "Chevette", "10", "1500", "20", "Citation", "Cobalt", "Colorado", "Corsica", "Corvette", "Cruze", "Equinox", "EV1", "Express 1500 Van", "Express 2500 Van", "Express 3500 Van", "Forward Control", "HHR", "II", "Impala", "Lumina", "Lumina Van", "Luv", "Malibu", "Metro", "Monte Carlo", "Monza", "Nova", "Omega", "Optra", "Passenger", "Prizm", "Silverado 1500", "Silverado 2500", "Silverado 3500", "Spectrum", "Sprint", "SSR", "Suburban 10", "Suburban 1000", "Suburban 1500", "Suburban 20", "Suburban 2500", "Suburban 30", "Tahoe", "Tracker", "Trailblazer", "Trailblazer EXT", "Traverse", "Uplander"],
  // ... (keep rest of vehicleData same as your current file)
};

// Parts categories list
const partCategories = [
  "Engine", "Transmission", "Alternator", "Axle Assembly", "AC Compressor", "Fuel Pump",
  "Brake Booster", "Steering Column", "Wheel Rim", "Bumper", "Headlight", "Taillight",
  "Door", "Hood", "Fender", "Side View Mirror", "Dashboard", "Seat", "Sunroof",
  "Heater Core", "Grille", "Flywheel", "Oil Pan", "Transfer Case", "Turbocharger",
  "Power Steering Pump", "Shock Absorber", "Strut", "Control Arm", "Ball Joint",
  "Brake Caliper", "Driveshaft", "Air Filter", "Exhaust Manifold", "Intake Manifold",
  "Window Regulator", "Windshield", "Fuel Injector", "Ignition Coil", "Speedometer",
  "Cluster", "Wiring Harness", "ECU Computer", "Door Lock Actuator", "Fuel Tank",
  "Steering Rack", "Differential", "Hub Assembly", "Spindle", "Knuckle", "Suspension Arm",
  "Spring", "Trunk Lid", "Spoiler", "Crossmember", "Mount Bracket", "Engine Cradle",
  "Control Module", "Valve Cover", "Oil Pump", "Fuel Rail", "Airbag", "Seat Belt",
  "Sensor", "Oxygen Sensor", "Mass Air Flow Sensor", "ABS Module", "Radiator Fan",
  "Blower Motor", "HVAC Control", "Radio", "Infotainment Unit", "Antenna", "GPS Module",
  "Camera", "Rearview Mirror", "Door Handle", "Tailgate", "Cargo Door", "Side Step",
  "Roof Rack", "Fuel Door", "License Plate Bracket", "Fog Light", "Signal Light",
  "Backup Light", "Headlamp Switch", "Turn Signal Switch", "Wiper Motor", "Washer Pump",
  "Coolant Reservoir", "Overflow Tank", "Brake Line", "Clutch Master Cylinder",
  "Slave Cylinder", "Shifter", "Gearbox", "Torque Converter", "Bell Housing", "Drum",
  "Clutch Disc", "Pedal Assembly", "Hood Latch", "Hinge", "Rear Panel", "Floor Pan",
  "Radiator Support", "Bumper Reinforcement", "Fog Lamp Bezel", "Trim Molding",
  "Interior Trim", "Dash Bezel", "Cup Holder", "Glove Box", "Console", "Armrest",
  "Seat Cover", "Door Panel", "Rear Deck", "Tail Panel", "Rear Bumper", "Front Bumper",
  "Door Mirror", "Engine Cover", "Valve Body", "Oil Cooler", "Transmission Cooler",
  "Clutch Cable", "Accelerator Pedal", "Brake Pedal", "Seat Frame Or Track", "Rear Axle",
  "Front Axle", "Drivetrain", "Motor Controller", "Drive Unit", "Thermostat", "Radiator Cap",
  "Fan Shroud", "Air Duct", "Engine Mount", "Transmission Mount", "Floor Shift Assembly",
  "Center Console", "Rear Defroster", "Blower Resistor"
];

const Home = () => {
  const scrollRef = React.useRef(null);

  const [selectedYear, setSelectedYear] = React.useState("");
  const [selectedMake, setSelectedMake] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState("");
  const [selectedPart, setSelectedPart] = React.useState("");

  const availableModels = selectedMake ? vehicleData[selectedMake] || [] : [];

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") current.scrollLeft -= 300;
    else current.scrollLeft += 300;
  };

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
    setSelectedModel(""); // reset model
  };

  const handleSearch = () => {
    console.log({ year: selectedYear, make: selectedMake, model: selectedModel, part: selectedPart });
    // You can navigate or fetch results here
  };

  const FAQItem = ({ item }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className={`faq-item ${open ? "open" : ""}`}>
        <div className="faq-question" onClick={() => setOpen(!open)}>
          <h4>{item.question}</h4>
          <span className="faq-icon">{open ? "−" : "+"}</span>
        </div>
        <div className="faq-answer">
          <p>{item.answer}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Banner Section with updated search */}
      <section className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="banner-overlay"></div>
        <div className="banner-gradient"></div>

        <div className="banner-inner">
          <div className="banner-left">
            <h1>
              Millions of <span className="highlight">OEM Parts.</span> <br />
              Matched to Your Vehicle.
            </h1>
            <p>One smart search. Your perfect fit starts here.</p>
          </div>

          <div className="banner-right">
            <div className="banner-form">
              <div className="row">
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  <option value="">Year</option>
                  {Array.from({ length: 2025 - 1990 + 1 }, (_, i) => 2025 - i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select value={selectedMake} onChange={handleMakeChange}>
                  <option value="">Make</option>
                  {Object.keys(vehicleData).sort().map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>

                <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedMake}>
                  <option value="">Model</option>
                  {availableModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <select className="full" value={selectedPart} onChange={(e) => setSelectedPart(e.target.value)}>
                <option value="">Select Part Category</option>
                {partCategories.map((part, index) => (
                  <option key={index} value={part}>{part}</option>
                ))}
              </select>

              <button type="button" onClick={handleSearch}>Search Now</button>
            </div>
            <p className="vin-link">
              Don't know your vehicle? <a href="#">Enter VIN</a>
            </p>
          </div>
        </div>
      </section>

      {/* Why Nexxa Auto Parts Section */}
      <section className="why-nexxa">
        <div className="why-nexxa-container">
          <h3 className="why-title">Why Nexxa Auto Parts</h3>

          <div className="why-boxes">
            <div className="why-box"><span>Free expert support</span></div>
            <div className="why-box"><span>Low mileage parts</span></div>
            <div className="why-box"><span>Nationwide shipping</span></div>
            <div className="why-box"><span>VIN-matched parts</span></div>
          </div>
        </div>
      </section>

      {/* Explore Our Premium Used Auto Parts */}
      <section className="explore-parts">
        <h2>Explore Our <span className="highlight">Premium</span> Used Auto Parts</h2>
        <div className="scroll-wrapper">
          <div className="cards-container" ref={scrollRef}>
            {[part1, part2, part3, part4, part5, part6, part7, part8, part9, part10].map((img, idx) => (
              <div className="part-card" key={idx}>
                <img src={img} alt={`Part ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="features-container">
          <div className="feature-card"><div className="feature-header"><span className="icon">🔍</span><h3>Find Your Part</h3></div><p>Search our extensive inventory by entering your vehicle details and part requirements.</p></div>
          <div className="feature-card"><div className="feature-header"><span className="icon">💬</span><h3>Get a Quote</h3></div><p>Receive a competitive quote with detailed information about part condition and warranty.</p></div>
          <div className="feature-card"><div className="feature-header"><span className="icon">🚚</span><h3>Fast Shipping</h3></div><p>We ship your part quickly with nationwide delivery and tracking information.</p></div>
          <div className="feature-card"><div className="feature-header"><span className="icon">🛡️</span><h3>Warranty Support</h3></div><p>Enjoy peace of mind with standard warranty and responsive customer service.</p></div>
        </div>
      </section>

      {/* What Our Customers Says */}
      <section className="customer-reviews">
        <h2>What Our <span>Customers Says</span></h2>
        <div className="reviews-slider">
          <div className="reviews-track">
            {[
              { name: "Rahul Menon", review: "Quality parts and fast delivery. Highly recommended!" },
              { name: "Anjali Krishnan", review: "Customer support was very helpful and polite." },
              { name: "Arjun Nair", review: "Perfect fit for my car. Saved a lot of money." },
              { name: "Sreejith Kumar", review: "Smooth experience from search to delivery." },
              { name: "Neha Sharma", review: "Packaging was excellent and product was genuine." }
            ].map((item, index) => (
              <div className="review-card" key={index}>
                <div className="review-header"><span className="user-icon">👤</span><h4>{item.name}</h4></div>
                <span className="review-time">2 weeks ago</span>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">{item.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-left">
            <h2>Ready to Find Your Part</h2>
            <p>Contact us today for a quick quote on the exact <br /> part you need. Our team is standing by to help</p>
            <button className="cta-btn">Start Your Search</button>
          </div>
          <div className="cta-right">
            <img src={ctaImage} alt="Auto Parts" />
          </div>
        </div>
      </section>
{/* brand section */}
{/* Brands Section */}
<section className="brands-section">
  <h2>Brands we carry</h2>
  <p>We stock parts for all major automatiive brands</p>
  <div className="brands-marquee">
    <div className="brands-track">
      {brands.map((brand, idx) => (
        <div className="brand-card" key={idx}>
          <img src={brand} alt={`Brand ${idx + 1}`} />
        </div>
      ))}
      {/* Repeat once for smooth infinite scroll */}
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
