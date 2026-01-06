import "./App.css";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacypolicy from "./pages/Policypage.jsx";
import ProductDetails from "./pages/ProductDetails";
import Warranty from "./pages/Warranty";
import Terms from "./pages/Terms";
import Landing from "./pages/Landing.jsx";
import BrandDetail from "./pages/BrandDetail.jsx";
import CallModal from './components/CallModal';
import ProductPage from "./pages/ProductPage.jsx";
import OrderPage from './pages/OrderPage';



function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/product", "/order"];

  const hideNavbar = hideNavbarRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
    
    {!hideNavbar && <Navbar />}

        <CallModal />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/terms-and-condition" element={<Terms />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />


        {/* ONE page for ALL brands */}
          <Route path="/brand/:id" element={<BrandDetail />} />
          <Route path="/order" element={<OrderPage />} />


      </Routes>

      <Footer />
    </>
  );
}

export default App;
