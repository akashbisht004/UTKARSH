import { Heart, Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Nirog AI</span>
            </div>
            <p className="mt-4 text-gray-400">
              Providing accessible and convenient healthcare solutions to improve your well-being.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Book Appointment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Our Doctors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0" />
                <span>Dehradun<br />Uttarakhand<br />Uttarakhand 248007</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0" />
                <span>+91 999999999</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0" />
                <span>contact@nirog.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-6 w-6 text-blue-400 mr-2 flex-shrink-0" />
                <span>Mon-Fri: 8AM - 8PM<br />Sat-Sun: 9AM - 5PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Nirog AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;