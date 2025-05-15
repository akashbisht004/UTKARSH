import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  footerText, 
  footerLink, 
  footerLinkText,
  onFooterLinkClick,
  isModal = false
}) => {
  const navigate = useNavigate();

  const handleFooterLinkClick = (e) => {
    if (onFooterLinkClick) {
      e.preventDefault();
      onFooterLinkClick();
    } else if (footerLink) {
      navigate(footerLink);
    }
  };

  return (
    <div className={`${isModal ? 'bg-transparent' : 'bg-background'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card text-card-foreground py-8 px-4 shadow-sm rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      {footerText && (
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {footerText}{' '}
            <Link 
              to={footerLink || '#'} 
              onClick={handleFooterLinkClick}
              className="font-medium text-primary hover:text-primary/90"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthLayout; 