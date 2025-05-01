import { useState } from "react";
import { Heart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Nirog Ai</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-blue-600 font-medium px-3 py-2 rounded-md">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">About</Link>
              <Link to="/services" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Services</Link>
              <Link to="/appointment" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">Book Appointment</Link>
            </nav>
          </div>
          
          {/* Sign in/Login Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login" // Use Link with the "to" prop
              className="flex items-center text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md font-medium"
            >
              <User className="h-5 w-5 mr-2" />
              Sign In / Login
            </Link>
          </div> 
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-blue-600 focus:outline-none"
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
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-blue-600 font-medium rounded-md">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md">About</Link>
            <Link to="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md">Services</Link>
            <Link to="/appointment" className="block px-3 py-2 text-gray-600 hover:text-blue-600 rounded-md">Book Appointment</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link
                to="/login" // Use Link with the "to" prop
                className="flex-1 block text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md font-medium"
              >
                <User className="inline-block h-5 w-5 mr-2" />
                Sign In / Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;