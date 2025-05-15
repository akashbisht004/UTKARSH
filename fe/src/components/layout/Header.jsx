import { Heart, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../ThemeToggle";

function Header({ openLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur shadow-lg' : 'bg-background/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="flex-shrink-0 relative">
                <Heart className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                <Heart className="h-8 w-8 text-primary absolute top-0 left-0 opacity-50 blur-sm transition-all duration-300 group-hover:blur-md group-hover:scale-125" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Nirogh
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-1">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/services', label: 'Services' },
                { path: '/login', label: 'Book Appointment' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={openLogin}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
              <User className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-64 border-t border-primary/10' : 'max-h-0'
      }`}>
        <div className="px-4 py-2 space-y-1 bg-background/80 backdrop-blur">
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/services', label: 'Services' },
            { path: '/login', label: 'Book Appointment' }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActiveRoute(item.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;