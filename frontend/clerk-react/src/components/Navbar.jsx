import { useState } from "react";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

export default function App() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-black text-white relative z-50">
        <div className="max-w-full mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 p-2 rounded">
                  <span className="text-2xl font-bold">N</span>
                </div>
                <span className="text-xl font-bold">EXXA</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:text-red-600 transition-colors">
                Home
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Parts
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Contact
              </a>
            </div>

            {/* Auth Buttons & User Button */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 text-white hover:text-red-600 transition-colors font-medium"
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
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-red-600 transition-colors"
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
              <a
                href="#"
                className="block py-2 hover:text-red-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="block py-2 hover:text-red-600 transition-colors"
              >
                Parts
              </a>
              <a
                href="#"
                className="block py-2 hover:text-red-600 transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="block py-2 hover:text-red-600 transition-colors"
              >
                Contact
              </a>

              <SignedOut>
                <div className="pt-4 space-y-2 border-t border-gray-800">
                  <button
                    onClick={handleSignIn}
                    className="w-full px-4 py-2 text-left hover:text-red-600 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors font-medium text-center"
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

      {/* Secondary Navigation Bar */}
      <div className="bg-gray-900 text-white py-3 overflow-x-auto">
        <div className="max-w-full mx-auto px-8">
          <div className="flex items-center space-x-6 text-sm whitespace-nowrap">
            <a href="#" className="hover:text-red-600 transition-colors">
              Used Kia Parts
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Used Porsche Parts
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Used BMW Parts
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Used Mercedes Parts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

