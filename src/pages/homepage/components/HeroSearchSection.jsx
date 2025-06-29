import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSearchSection = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [errors, setErrors] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateSearch = () => {
    const newErrors = {};

    if (!searchParams.location.trim()) {
      newErrors.location = 'Please enter a location';
    }

    if (!searchParams.checkIn) {
      newErrors.checkIn = 'Please select check-in date';
    }

    if (!searchParams.checkOut) {
      newErrors.checkOut = 'Please select check-out date';
    }

    if (searchParams.checkIn && searchParams.checkOut) {
      const checkInDate = new Date(searchParams.checkIn);
      const checkOutDate = new Date(searchParams.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        newErrors.checkIn = 'Check-in date cannot be in the past';
      }

      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    if (searchParams.guests < 1) {
      newErrors.guests = 'At least 1 guest is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = async () => {
    if (!validateSearch()) {
      return;
    }

    setIsSearching(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to homepage with search parameters
      const searchQuery = new URLSearchParams({
        location: searchParams.location.trim(),
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests.toString(),
      }).toString();
      
      navigate(`/homepage?${searchQuery}`);
    } catch (error) {
      console.error('Search error:', error);
      setErrors({ general: 'Search failed. Please try again.' });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const incrementGuests = () => {
    setSearchParams(prev => ({
      ...prev,
      guests: prev.guests + 1
    }));
    
    if (errors.guests) {
      setErrors(prev => ({
        ...prev,
        guests: ''
      }));
    }
  };

  const decrementGuests = () => {
    setSearchParams(prev => ({
      ...prev,
      guests: Math.max(1, prev.guests - 1)
    }));
    
    if (errors.guests) {
      setErrors(prev => ({
        ...prev,
        guests: ''
      }));
    }
  };

  // Set minimum date for check-in and check-out
  const today = new Date().toISOString().split('T')[0];
  const minCheckOut = searchParams.checkIn || today;

  return (
    <section className="bg-gradient-to-br from-red-50 to-pink-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-text-primary mb-6">
            Find your perfect place
          </h1>
          <p className="text-lg lg:text-xl font-inter text-text-secondary max-w-2xl mx-auto">
            Discover unique stays, private rooms, and amazing homes around the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-2xl shadow-lg p-6 lg:p-8">
            {/* General Error */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-red-500" />
                  <p className="text-sm font-inter text-red-600">{errors.general}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
              {/* Location */}
              <div className="md:col-span-1">
                <label className="block text-xs font-inter font-semibold text-text-primary mb-2 uppercase tracking-wide">
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchParams.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full h-14 text-base ${errors.location ? 'border-red-500' : ''}`}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>

              {/* Check-in */}
              <div className="md:col-span-1">
                <label className="block text-xs font-inter font-semibold text-text-primary mb-2 uppercase tracking-wide">
                  Check-in
                </label>
                <Input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  min={today}
                  className={`w-full h-14 text-base ${errors.checkIn ? 'border-red-500' : ''}`}
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>
                )}
              </div>

              {/* Check-out */}
              <div className="md:col-span-1">
                <label className="block text-xs font-inter font-semibold text-text-primary mb-2 uppercase tracking-wide">
                  Check-out
                </label>
                <Input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  min={minCheckOut}
                  className={`w-full h-14 text-base ${errors.checkOut ? 'border-red-500' : ''}`}
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>
                )}
              </div>

              {/* Guests */}
              <div className="md:col-span-1">
                <label className="block text-xs font-inter font-semibold text-text-primary mb-2 uppercase tracking-wide">
                  Guests
                </label>
                <div className={`flex items-center justify-between h-14 px-4 border rounded-md bg-background ${
                  errors.guests ? 'border-red-500' : 'border-border-input'
                }`}>
                  <Button
                    variant="ghost"
                    onClick={decrementGuests}
                    disabled={searchParams.guests <= 1}
                    className="w-8 h-8 p-0 rounded-full"
                    iconName="Minus"
                    iconSize={16}
                  />
                  <span className="text-base font-inter font-medium text-text-primary">
                    {searchParams.guests} {searchParams.guests === 1 ? 'guest' : 'guests'}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={incrementGuests}
                    className="w-8 h-8 p-0 rounded-full"
                    iconName="Plus"
                    iconSize={16}
                  />
                </div>
                {errors.guests && (
                  <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                variant="primary"
                onClick={handleSearch}
                iconName="Search"
                iconPosition="left"
                size="lg"
                className="px-12 py-4 text-lg font-semibold"
                loading={isSearching}
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearchSection;