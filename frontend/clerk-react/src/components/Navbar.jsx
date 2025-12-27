import { useState } from "react";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "../assets/images/logoimg-removebg-preview.png";
import "./navbar.css"; 


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clerk = useClerk();

  const handleSignIn = () => {
    clerk.openSignIn();
  };

  const handleSignUp = () => {
    clerk.openSignUp();
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-black text-white relative z-50">
        <div className="max-w-full mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImage} alt="Nexxa Logo" className="h-10 w-auto" />
            </Link>

            {/* Auth (kept untouched & commented) */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                {/* 
                <button onClick={handleSignIn}>Login</button>
                <button onClick={handleSignUp}>Register</button>
                */}
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Hamburger Icon (Desktop + Mobile) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hover:text-red-600"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* Overlay Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/[0.01] backdrop-blur-sm z-50">
            <div className="absolute right-0 top-0 h-full w-64 bg-black border-l border-gray-800 p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={closeMenu}
                  className="hover:text-red-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col space-y-4 text-lg">
                <Link to="/" onClick={closeMenu} className="hover:text-red-600">
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="hover:text-red-600"
                >
                  About Us
                </Link>
                <Link
                  to="/contact-us"
                  onClick={closeMenu}
                  className="hover:text-red-600"
                >
                  Contact
                </Link>
                <Link
                  to="/Privacy-policy"
                  onClick={closeMenu}
                  className="hover:text-red-600"
                >
                  Privacy Policy
                </Link>
                <Link to="/warranty">Warranty & Return Policy</Link> 
                <Link to="/terms-and-conditions">Terms & Conditions</Link> 
              </nav>
            </div>
          </div>
        )}
      </nav>

{/* Secondary Nav with continuous scroll inside rectangle */}
<div className="scroll-container">
  <div className="scrolling-text">
    {[
      "Used Kia Parts",
      "Used Porsche Parts",
      "Used BMW Parts",
      "Used Mercedes Parts",
    ].map((item, index) => (
      <span key={index} className="scroll-item">
        {item}
      </span>
    ))}
    {/* Repeat items to make seamless loop */}
    {[
      "Used Kia Parts",
      "Used Porsche Parts",
      "Used BMW Parts",
      "Used Mercedes Parts",
    ].map((item, index) => (
      <span key={"r" + index} className="scroll-item">
        {item}
      </span>
    ))}
  </div>
</div>


    </div>
  );
}
