import { Heart, Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";


function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">Nirog AI</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Providing accessible and convenient healthcare solutions to improve your well-being.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground">Services</Link></li>
              <li><Link to="/appointment" className="text-muted-foreground hover:text-foreground">Book Appointment</Link></li>
              <li className="text-muted-foreground hover:text-foreground">Privacy Policy</li>
            </ul>
          </div>
                
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground">Dehradun<br />Uttarakhand<br />Uttarakhand 248007</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground">+91 999999999</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground">contact@nirog.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <span className="text-muted-foreground">Mon-Fri: 8AM - 8PM<br />Sat-Sun: 9AM - 5PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            &copy; {currentYear} Nirog AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;