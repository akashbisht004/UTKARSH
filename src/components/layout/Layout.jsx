import Header from './Header';
import Footer from './Footer';

import { useState } from 'react';
import LogInPage from '../LogInPage';
import SignUpPage from '../SignUpPage';


export default function Layout({ children }) {

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };
  
  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  
  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div className="min-h-screen flex flex-col">

      <Header openLogin={openLogin} openSignup={openSignup} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

      <LogInPage
          isVisible={showLogin} 
          onClose={closeModals} 
          onSwitchToSignup={openSignup} 
      />
      
      <SignUpPage 
          isVisible={showSignup} 
          onClose={closeModals} 
          onSwitchToLogin={openLogin} 
      />
 
    </div>
  );
}
