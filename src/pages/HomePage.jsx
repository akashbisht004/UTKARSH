import Layout from '../components/layout/Layout';

import { useState } from 'react';
import { User, Lock, Mail, X, UserPlus, LogIn, Heart } from 'lucide-react';

 
function Home() {

  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - would connect to backend in real app
    console.log(isLogin ? 'Login submitted' : 'Signup submitted');
    toggleModal();
  };



  return (
    <Layout>
      {/* Hero section */}
      <section
        style={{
          color: '#003366',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100vh',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background dots */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `radial-gradient(circle, rgba(200, 220, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            zIndex: 0,
          }}
        ></div>

        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Welcome to Nirog AI
        </h1>
        <p
          style={{
            fontSize: '2.5rem',
            marginBottom: '30px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Your trusted partner in health and wellness.
        </p>
        <br />
        <p
          style={{
            fontSize: '1rem',
            marginBottom: '30px',
            lineHeight: '1.8',
            maxWidth: '800px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
        </p>
        <p
          style={{
            fontSize: '1rem',
            marginBottom: '30px',
            lineHeight: '1.8',
            maxWidth: '800px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Lorem ipsum dolor sit quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button
          style={{
            backgroundColor: '#00509e',
            color: '#ffffff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontSize: '1rem',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 1,
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = 'none';
          }}
        >
          Learn More
        </button>
      </section>
      
      {/* Login/Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={toggleModal}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 relative overflow-hidden">
            {/* Modal Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center">
                {isLogin ? (
                  <>
                    <LogIn className="mr-2" size={20} />
                    Login
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" size={20} />
                    Sign Up
                  </>
                )}
              </h2>
              <button 
                onClick={toggleModal}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Form */}
            <div className="p-6">
              {isLogin ? (
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
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Forgot password?
                      </a>
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
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="signup-email">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="signup-password">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="pl-10 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <UserPlus className="mr-2" size={16} />
                    Sign Up
                  </button>
                </div>
              )}
              
              {/* Toggle between login and signup */}
              <div className="mt-4 text-center text-sm">
                {isLogin ? (
                  <p>
                    Don't have an account?{' '}
                    <button
                      onClick={toggleForm}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button
                      onClick={toggleForm}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Home;
