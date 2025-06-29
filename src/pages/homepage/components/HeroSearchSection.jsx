import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSearchSection = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    const searchQuery = new URLSearchParams({
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests.toString(),
    }).toString();
    
    navigate(`/homepage?${searchQuery}`);
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
                  className="w-full h-14 text-base"
                />
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
                  className="w-full h-14 text-base"
                />
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
                  className="w-full h-14 text-base"
                />
              </div>

              {/* Guests */}
              <div className="md:col-span-1">
                <label className="block text-xs font-inter font-semibold text-text-primary mb-2 uppercase tracking-wide">
                  Guests
                </label>
                <div className="flex items-center justify-between h-14 px-4 border border-border-input rounded-md bg-background">
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
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearchSection;