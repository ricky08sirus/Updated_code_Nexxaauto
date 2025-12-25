import React from "react";
import "./Home.css";
import bannerImage from "../assets/images/banner-img.webp";
import part1 from "../assets/images/Anti Brake Module-Pump.webp";
import part2 from "../assets/images/Radio controller- Display.webp";
import part3 from "../assets/images/Display.webp";
import part4 from "../assets/images/Mechanical parts.webp";
import part5 from "../assets/images/Body Parts.webp";
import part6 from "../assets/images/transmission.webp";
import part7 from "../assets/images/Engine Computers.webp";
import part8 from "../assets/images/Engine.webp";
import part9 from "../assets/images/Engines.webp";
import part10 from "../assets/images/Rims.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  // For horizontal scrolling
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 300; // adjust scroll amount
    } else {
      current.scrollLeft += 300;
    }
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
      {/* Banner Section */}
      <section
        className="banner"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
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
            <form className="banner-form">
              <div className="row">
                <select><option>Year</option></select>
                <select><option>Make</option></select>
                <select><option>Model</option></select>
              </div>
              <select className="full"><option>Part Category</option></select>
              <button type="submit">Search Now</button>
            </form>
            <p className="vin-link">
              Don’t know your vehicle? <a href="#">Enter VIN</a>
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
        <img src={part1} alt="Support" />
        <span>Free expert support</span>
      </div>

      <div className="why-box">
        <img src={part2} alt="Mileage" />
        <span>Low mileage parts</span>
      </div>

      <div className="why-box">
        <img src={part3} alt="Shipping" />
        <span>Nationwide shipping</span>
      </div>

      <div className="why-box">
        <img src={part4} alt="VIN" />
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
    <div className="cards-container" ref={scrollRef}>
      {[
        { img: part1, name: "Anti Brake Module-pump" },
        { img: part2, name: "Radio controller- Display" },
        { img: part3, name: "Display" },
        { img: part4, name: "Mechanical" },
        { img: part5, name: "Body Parts" },
        { img: part6, name: "Transmission" },
        { img: part7, name: "Engine computers" },
        { img: part8, name: "Engine" },
        { img: part9, name: "Engines" },
        { img: part10, name: "Rims" }
      ].map((item, idx) => (
        <div className="part-card" key={idx}>
          <img src={item.img} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
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
      <p>Search our extensive inventory by entering your vehicle details and part requirements.</p>
    </div>

    <div className="feature-card">
      <div className="feature-header">
        <span className="icon">💬</span>
        <h3>Get a Quote</h3>
      </div>
      <p>Search our extensive inventory by entering your vehicle details and part requirements.</p>
    </div>

    <div className="feature-card">
      <div className="feature-header">
        <span className="icon">🚚</span>
        <h3>Fast Shipping</h3>
      </div>
      <p>Search our extensive inventory by entering your vehicle details and part requirements.</p>
    </div>

    <div className="feature-card">
      <div className="feature-header">
        <span className="icon">🛡️</span>
        <h3>Warranty Support</h3>
      </div>
      <p>Search our extensive inventory by entering your vehicle details and part requirements.</p>
    </div>
  </div>
</section>

{/* user review */}
{/* What Our Customers Says */}
<section className="customer-reviews">
  <h2>What Our <span> Customers Says</span></h2>

  <div className="reviews-slider">
    <div className="reviews-track">
      {[
        {
          name: "Rahul Menon",
          review: "Quality parts and fast delivery. Highly recommended!"
        },
        {
          name: "Anjali Krishnan",
          review: "Customer support was very helpful and polite."
        },
        {
          name: "Arjun Nair",
          review: "Perfect fit for my car. Saved a lot of money."
        },
        {
          name: "Sreejith Kumar",
          review: "Smooth experience from search to delivery."
        },
        {
          name: "Neha Sharma",
          review: "Packaging was excellent and product was genuine."
        }
      ].concat(
        [
          {
            name: "Rahul Menon",
            review: "Quality parts and fast delivery. Highly recommended!"
          },
          {
            name: "Anjali Krishnan",
            review: "Customer support was very helpful and polite."
          },
          {
            name: "Arjun Nair",
            review: "Perfect fit for my car. Saved a lot of money."
          },
          {
            name: "Sreejith Kumar",
            review: "Smooth experience from search to delivery."
          },
          {
            name: "Neha Sharma",
            review: "Packaging was excellent and product was genuine."
          }
        ]
      ).map((item, index) => (
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


{/* Call To Action Section */}
<section className="cta-section">
  <div className="cta-container">

    {/* Left Content */}
    <div className="cta-left">
      <h2>
        Ready to Find Your Part</h2>

      <p>
  Contact us today for a quick quote on the exact <br />
  part you need. Our team is standing by to help
</p>


      <button className="cta-btn">Start Your Search</button>
    </div>

    {/* Right Image */}
    <div className="cta-right">
      <img src={bannerImage} alt="Auto Parts" />
    </div>

  </div>
</section>

{/* Band section */}
{/* Brands We Carry */}
{/* <section className="brands-section">
  <h2>Brands We Carry</h2>

  <div className="brands-slider">
    <div className="brands-track">
      {[
        { name: "Toyota", img: toyota },
        { name: "Honda", img: honda },
        { name: "Ford", img: ford },
        { name: "BMW", img: bmw },
        { name: "Audi", img: audi },
        { name: "Mercedes", img: mercedes },
        { name: "Hyundai", img: hyundai },
        { name: "Kia", img: kia },
        { name: "Nissan", img: nissan },
        { name: "Volkswagen", img: volkswagen }
      ]
        .concat([
          { name: "Toyota", img: toyota },
          { name: "Honda", img: honda },
          { name: "Ford", img: ford },
          { name: "BMW", img: bmw },
          { name: "Audi", img: audi },
          { name: "Mercedes", img: mercedes },
          { name: "Hyundai", img: hyundai },
          { name: "Kia", img: kia },
          { name: "Nissan", img: nissan },
          { name: "Volkswagen", img: volkswagen }
        ])
        .map((brand, index) => (
          <div className="brand-card" key={index}>
            <img src={brand.img} alt={brand.name} />
          </div>
        ))}
    </div>
  </div>
</section> */}




    </div>
  );
};

export default Home;
