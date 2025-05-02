import { useState } from 'react';
import { Lock, Mail, X, LogIn } from 'lucide-react';

export default function LogInPage({ isVisible, onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission logic here
    console.log('Login submitted with:', { email, password });
    onClose();
  };

  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 relative overflow-hidden">
        {/* Modal Header */}
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center">
            <LogIn className="mr-2" size={20} />
            Login
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <LogIn className="mr-2" size={16} />
              Login
            </button>
          </div>
          
          {/* Toggle to signup */}
          <div className="mt-4 text-center text-sm">
            <p>
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}