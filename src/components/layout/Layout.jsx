import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import AuthLayout from '../auth/AuthLayout';

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

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <AuthLayout
              title="Sign in to your account"
              subtitle="Welcome back"
              footerText="Don't have an account?"
              footerLink="#"
              footerLinkText="Sign up"
              onFooterLinkClick={openSignup}
              isModal={true}
            >
              <LoginForm />
            </AuthLayout>
            <button 
              onClick={closeModals}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <AuthLayout
              title="Create your account"
              subtitle="Join us today"
              footerText="Already have an account?"
              footerLink="#"
              footerLinkText="Sign in"
              onFooterLinkClick={openLogin}
              isModal={true}
            >
              <SignupForm />
            </AuthLayout>
            <button 
              onClick={closeModals}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
