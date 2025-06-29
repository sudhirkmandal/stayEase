import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationFooter = () => {
  return (
    <div className="mt-8 space-y-6">
      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm font-inter text-text-secondary">
          Masz już konto?{' '}
          <Link 
            to="/login" 
            className="text-primary hover:underline font-medium transition-colors duration-200"
          >
            Zaloguj się
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary font-inter">
            lub
          </span>
        </div>
      </div>

      {/* Additional Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm font-inter">
        <Link 
          to="/homepage" 
          className="text-text-secondary hover:text-primary transition-colors duration-200"
        >
          Strona główna
        </Link>
        <Link 
          to="/homepage" 
          className="text-text-secondary hover:text-primary transition-colors duration-200"
        >
          Pomoc
        </Link>
        <Link 
          to="/homepage" 
          className="text-text-secondary hover:text-primary transition-colors duration-200"
        >
          Kontakt
        </Link>
      </div>

      {/* Language Selector */}
      <div className="flex items-center justify-center space-x-2 text-sm font-inter text-text-secondary">
        <div className="flex items-center space-x-1">
          <span className="text-lg">🇵🇱</span>
          <span>Polski (PL)</span>
        </div>
        <span>•</span>
        <span>PLN (zł)</span>
      </div>

      {/* Copyright */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs font-inter text-text-secondary">
          © {new Date().getFullYear()} StayEase. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegistrationFooter;