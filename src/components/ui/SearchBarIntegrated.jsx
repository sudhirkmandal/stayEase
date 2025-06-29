import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const SearchBarIntegrated = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Navigate to homepage with search parameters
    const searchQuery = new URLSearchParams({
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests.toString(),
    }).toString();
    
    navigate(`/homepage?${searchQuery}`);
    setIsExpanded(false);
  };

  const incrementGuests = () => {
    setSearchParams(prev => ({
      ...prev,
      guests: prev.guests + 1
    }));
  };

  const decrementGuests = () => {
    setSearchParams(prev => ({
      ...prev,
      guests: Math.max(1, prev.guests - 1)
    }));
  };

  return (
    <div className="w-full">
      {/* Compact Search Bar */}
      <div 
        className={`bg-background border border-border rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
          isExpanded ? 'hidden' : 'block'
        }`}
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center px-6 py-3">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <span className="text-sm font-inter font-medium text-text-primary">
                  {searchParams.location || 'Where are you going?'}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-inter text-text-secondary">
                  {searchParams.checkIn && searchParams.checkOut 
                    ? `${searchParams.checkIn} - ${searchParams.checkOut}`
                    : 'Add dates'
                  }
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-inter text-text-secondary">
                  {searchParams.guests === 1 ? '1 guest' : `${searchParams.guests} guests`}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Search" size={16} color="white" />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Search Bar */}
      {isExpanded && (
        <div className="bg-background border border-border rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="md:col-span-1">
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                LOCATION
              </label>
              <Input
                type="text"
                placeholder="Where are you going?"
                value={searchParams.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Check-in */}
            <div className="md:col-span-1">
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                CHECK-IN
              </label>
              <Input
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Check-out */}
            <div className="md:col-span-1">
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                CHECK-OUT
              </label>
              <Input
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Guests */}
            <div className="md:col-span-1">
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                GUESTS
              </label>
              <div className="flex items-center space-x-3 p-3 border border-border-input rounded-md">
                <Button
                  variant="ghost"
                  onClick={decrementGuests}
                  disabled={searchParams.guests <= 1}
                  className="w-8 h-8 p-0 rounded-full"
                  iconName="Minus"
                  iconSize={16}
                />
                <span className="text-sm font-inter font-medium text-text-primary min-w-[2rem] text-center">
                  {searchParams.guests}
                </span>
                <Button
                  variant="ghost"
                  onClick={incrementGuests}
                  className="w-8 h-8 p-0 rounded-full"
                  iconName="Plus"
                  iconSize={16}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(false)}
              className="text-text-secondary hover:text-text-primary"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSearch}
              iconName="Search"
              iconPosition="left"
              className="px-8"
            >
              Search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBarIntegrated;