import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Github, ShoppingBag } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="ml-2 text-xl font-medium">University LX</span>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <Link
              to="/products"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/auth"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center">
                <Github className="h-4 w-4 mr-1" />
                <span>Source</span>
              </div>
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} University LX. All rights
            reserved.
          </p>
          <p className="mt-2">Made with ❤️ for campus students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
