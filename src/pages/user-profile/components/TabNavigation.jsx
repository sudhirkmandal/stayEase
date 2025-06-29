import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const [bookingCount, setBookingCount] = useState(0);
  const { user, isAuthenticated } = useAuth();

  // Load booking count from localStorage - only for current user
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

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      count: null
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: 'Calendar',
      count: bookingCount
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: 'Heart',
      count: 12
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      count: null
    }
  ];

  return (
    <div className="bg-background border border-border rounded-lg mb-6">
      {/* Mobile Tab Navigation */}
      <div className="md:hidden">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value)}
            className="w-full p-4 text-sm font-inter font-medium text-text-primary bg-background border-none rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label} {tab.count && `(${tab.count})`}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Icon name="ChevronDown" size={20} className="text-text-secondary" />
          </div>
        </div>
      </div>

      {/* Desktop Tab Navigation */}
      <div className="hidden md:flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-inter font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-primary border-primary bg-primary/5'
                : 'text-text-secondary border-transparent hover:text-text-primary hover:bg-surface'
            }`}
          >
            <Icon name={tab.icon} size={20} />
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className="px-2 py-0.5 text-xs bg-border text-text-secondary rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;