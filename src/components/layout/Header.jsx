import { Heart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";

function Header({ openLogin, openSignup }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur fixed top-0 left-0 w-full shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Heart className="h-7 w-7 text-primary" />
                <span className="ml-3 text-xl font-bold text-foreground">
                  <Link to="/">Nirogh </Link>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md">About</Link>
              <Link to="/services" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md">Services</Link>
              <Link to="/appointment" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md">Book Appointment</Link>
            </nav>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={openLogin}
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md">Home</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md">About</Link>
            <Link to="/services" className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md">Services</Link>
            <Link to="/appointment" className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md">Book Appointment</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;