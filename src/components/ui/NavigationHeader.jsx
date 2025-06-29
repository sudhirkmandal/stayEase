import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import UserAccountDropdown from './UserAccountDropdown';
import { useAuth } from '../../contexts/AuthContext';

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navigationTabs = [
    { label: 'Homes', path: '/homepage', active: location.pathname === '/homepage' },
    { label: 'Experiences', path: '/experiences', active: location.pathname === '/experiences' },
    { label: 'Services', path: '/services', active: location.pathname === '/services' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[9998]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/homepage" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Home" size={20} color="white" />
                </div>
                <span className="text-xl font-poppins font-semibold text-primary">
                  StayEase
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationTabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.path}
                className={`px-3 py-2 rounded-md text-sm font-inter font-medium transition-colors duration-200 ${
                  tab.active
                    ? 'text-primary bg-surface' :'text-text-primary hover:text-primary hover:bg-surface'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/become-host"
              className="text-sm font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
            >
              Become a Host
            </Link>
            <UserAccountDropdown />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="p-2"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={24}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border absolute top-full left-0 right-0 z-[9999] shadow-lg">
          <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navigationTabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.path}
                className={`block px-3 py-2 rounded-md text-base font-inter font-medium transition-colors duration-200 ${
                  tab.active
                    ? 'text-primary bg-surface' :'text-text-primary hover:text-primary hover:bg-surface'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {tab.label}
              </Link>
            ))}
            <div className="border-t border-border pt-4">
              <Link
                to="/become-host"
                className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Host
              </Link>
            </div>
            <div className="border-t border-border pt-4">
              <div className="space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/user-profile"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/user-profile?tab=bookings"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All Bookings
                    </Link>
                    <Link
                      to="/user-profile?tab=saved"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Saved Properties
                    </Link>
                    <Link
                      to="/user-profile?tab=settings"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleMobileLogout}
                      className="block w-full text-left px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/bookings"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View Bookings
                    </Link>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 text-base font-inter font-medium text-text-primary hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;