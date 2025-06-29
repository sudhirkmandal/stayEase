import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const UserAccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Load booking count for current user
  useEffect(() => {
    const loadBookingCount = () => {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        
        // Filter bookings for current user only
        const userBookings = storedBookings.filter(booking => {
          // For backward compatibility, include bookings without userId for current user
          if (!booking.userId && isAuthenticated && user) {
            return true; // Assume old bookings belong to current user
          }
          return booking.userId === user?.id;
        });
        
        setBookingCount(userBookings.length);
      } catch (error) {
        console.error('Error loading booking count:', error);
        setBookingCount(0);
      }
    };

    if (isAuthenticated && user) {
      loadBookingCount();
    } else {
      setBookingCount(0);
    }
  }, [isAuthenticated, user]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    closeDropdown();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    closeDropdown();
    navigate('/login');
  };

  const menuItems = isAuthenticated
    ? [
        {
          label: 'Profile',
          path: '/user-profile',
          icon: 'User',
          active: location.pathname === '/user-profile',
        },
        {
          label: 'My bookings',
          path: '/user-profile?tab=bookings',
          icon: 'Calendar',
          active: location.pathname === '/user-profile' && location.search.includes('tab=bookings'),
          count: bookingCount
        },
        {
          label: 'View Bookings',
          path: '/bookings',
          icon: 'Calendar',
          active: location.pathname === '/bookings',
          count: bookingCount
        },
        {
          label: 'Favorites',
          path: '/homepage',
          icon: 'Heart',
          active: false,
        },
        {
          label: 'Settings',
          path: '/user-profile?tab=settings',
          icon: 'Settings',
          active: location.pathname === '/user-profile' && location.search.includes('tab=settings'),
        },
      ]
    : [
        {
          label: 'View Bookings',
          path: '/bookings',
          icon: 'Calendar',
          active: location.pathname === '/bookings',
        },
        {
          label: 'Log in',
          path: '/login',
          icon: 'LogIn',
          active: location.pathname === '/login',
        },
        {
          label: 'Sign up',
          path: '/register',
          icon: 'UserPlus',
          active: location.pathname === '/register',
        },
      ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 rounded-full border border-border hover:shadow-sm transition-all duration-200 ${
          isOpen ? 'shadow-sm bg-surface' : ''
        }`}
      >
        <Icon name="Menu" size={16} />
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          {isAuthenticated && user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background rounded-md shadow-lg border border-border z-[9999] sm:origin-top-right">
          <div className="relative sm:static">
            <div className="py-2 max-h-96 overflow-y-auto">
              {isAuthenticated && user && (
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-inter font-medium text-text-primary truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs font-inter text-text-secondary truncate">
                    {user.email || 'user@example.com'}
                  </p>
                </div>
              )}

              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-inter hover:bg-surface transition-colors duration-200 ${
                    item.active ? 'text-primary bg-surface' : 'text-text-primary'
                  }`}
                  onClick={closeDropdown}
                >
                  <Icon name={item.icon} size={16} className="mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.count !== undefined && item.count !== null && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-border text-text-secondary rounded-full flex-shrink-0">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="border-t border-border my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm font-inter text-text-primary hover:bg-surface transition-colors duration-200"
                  >
                    <Icon name="LogOut" size={16} className="mr-3 flex-shrink-0" />
                    <span className="truncate">Log out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountDropdown;