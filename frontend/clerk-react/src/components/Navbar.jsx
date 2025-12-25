import { useState } from "react";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const clerk = useClerk();

  const handleSignIn = () => {
    clerk.openSignIn({
      appearance: {
        elements: {
          formButtonPrimary: "bg-red-600 hover:bg-red-700",
          card: "shadow-2xl",
          headerTitle: "text-2xl font-bold",
          headerSubtitle: "text-gray-600",
          socialButtonsBlockButton: "border-2 hover:bg-gray-50",
          formFieldInput:
            "rounded-lg border-gray-300 focus:border-red-600 focus:ring-red-600",
          footerActionLink: "text-red-600 hover:text-red-700",
        },
      },
    });
  };

  const handleSignUp = () => {
    clerk.openSignUp({
      appearance: {
        elements: {
          formButtonPrimary: "bg-red-600 hover:bg-red-700",
          card: "shadow-2xl",
          headerTitle: "text-2xl font-bold",
          headerSubtitle: "text-gray-600",
          socialButtonsBlockButton: "border-2 hover:bg-gray-50",
          formFieldInput:
            "rounded-lg border-gray-300 focus:border-red-600 focus:ring-red-600",
          footerActionLink: "text-red-600 hover:text-red-700",
        },
      },
    });
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
              <div className="bg-red-600 p-2 rounded">
                <span className="text-2xl font-bold">N</span>
              </div>
              <span className="text-xl font-bold">EXXA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-red-600 transition-colors">
                Home
              </Link>
              <Link to="/parts" className="hover:text-red-600 transition-colors">
                Parts
              </Link>
              <Link to="/about" className="hover:text-red-600 transition-colors">
                About Us
              </Link>
              <Link to="/contact-us" className="hover:text-red-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 hover:text-red-600 transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors font-medium"
                >
                  Register
                </button>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:text-red-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <Link
                to="/"
                onClick={closeMenu}
                className="block py-2 hover:text-red-600"
              >
                Home
              </Link>
              <Link
                to="/parts"
                onClick={closeMenu}
                className="block py-2 hover:text-red-600"
              >
                Parts
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block py-2 hover:text-red-600"
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                onClick={closeMenu}
                className="block py-2 hover:text-red-600"
              >
                Contact
              </Link>

              <SignedOut>
                <div className="pt-4 space-y-2 border-t border-gray-800">
                  <button
                    onClick={handleSignIn}
                    className="w-full text-left py-2 hover:text-red-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md"
                  >
                    Register
                  </button>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="pt-4 border-t border-gray-800 flex items-center gap-2">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm text-gray-400">My Account</span>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </nav>

      {/* Secondary Nav */}
      <div className="bg-gray-900 text-white py-3 overflow-x-auto">
        <div className="max-w-full mx-auto px-8">
          <div className="flex items-center space-x-6 text-sm whitespace-nowrap">
            <span className="hover:text-red-600">Used Kia Parts</span>
            <span className="hover:text-red-600">Used Porsche Parts</span>
            <span className="hover:text-red-600">Used BMW Parts</span>
            <span className="hover:text-red-600">Used Mercedes Parts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
