import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/authContext";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  User,
  LogOut,
  Plus,
  ShoppingCart,
  BookmarkIcon,
  Container,
  ShoppingBag
} from "lucide-react";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-medium">University LX</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Browse
            </Link>

            {isAuthenticated && user.isVerified && user?.isProfileComplete && (
              <>
                <Link
                  to="/userproducts"
                  className="text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  Your Listings
                </Link>

                <Link
                  to="/saved"
                  className="text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  Saved
                </Link>
                <Link
                  to="/listing"
                  className="text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Sell Item
                  </Button>
                </Link>
              </>
            )}

            {isAuthenticated && user.isVerified ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-morphism animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Browse
            </Link>

            {isAuthenticated && user.isVerified && user?.isProfileComplete && (
              <>
                <Link
                  to="/userproducts"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Your Listings
                </Link>

                <Link
                  to="/saved"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <BookmarkIcon className="h-4 w-4 mr-2" />
                    Saved
                  </div>
                </Link>
                <Link
                  to="/listing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Sell Item
                  </div>
                </Link>
              </>
            )}

            {isAuthenticated && user.isVerified ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
