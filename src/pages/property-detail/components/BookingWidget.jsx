import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingWidget = ({ property, className = '' }) => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const incrementGuests = () => {
    setBookingData(prev => ({
      ...prev,
      guests: Math.min(prev.guests + 1, property.maxGuests)
    }));
  };

  const decrementGuests = () => {
    setBookingData(prev => ({
      ...prev,
      guests: Math.max(prev.guests - 1, 1)
    }));
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = nights * property.pricePerNight;
    const cleaningFee = property.cleaningFee || 50;
    const serviceFee = Math.round(subtotal * 0.14);
    return {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      total: subtotal + cleaningFee + serviceFee
    };
  };

  const handleBooking = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    // Navigate to booking confirmation with booking data
    navigate('/booking-confirmation', {
      state: {
        property,
        bookingData,
        pricing: calculateTotal()
      }
    });
  };

  const pricing = calculateTotal();

  return (
    <div className={`bg-background border border-border rounded-lg shadow-md ${className}`}>
      <div className="p-6">
        {/* Price Header */}
        <div className="flex items-baseline space-x-2 mb-6">
          <span className="text-2xl font-poppins font-semibold text-text-primary">
            ${property.pricePerNight.toLocaleString('en-US')}
          </span>
          <span className="text-text-secondary">per night</span>
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-inter font-medium text-text-primary mb-1">
                CHECK-IN
              </label>
              <Input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-inter font-medium text-text-primary mb-1">
                CHECK-OUT
              </label>
              <Input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs font-inter font-medium text-text-primary mb-1">
              GUESTS
            </label>
            <div className="flex items-center justify-between p-3 border border-border-input rounded-md">
              <span className="text-text-primary">
                {bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={decrementGuests}
                  disabled={bookingData.guests <= 1}
                  className="w-8 h-8 p-0 rounded-full"
                  iconName="Minus"
                  iconSize={16}
                />
                <Button
                  variant="ghost"
                  onClick={incrementGuests}
                  disabled={bookingData.guests >= property.maxGuests}
                  className="w-8 h-8 p-0 rounded-full"
                  iconName="Plus"
                  iconSize={16}
                />
              </div>
            </div>
          </div>

          {/* Book Button */}
          <Button
            variant="primary"
            onClick={handleBooking}
            className="w-full py-3 text-lg font-medium"
          >
            Reserve
          </Button>

          {/* Pricing Breakdown */}
          {pricing.nights > 0 && (
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex justify-between text-text-primary">
                <span>
                  ${property.pricePerNight.toLocaleString('en-US')} × {pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}
                </span>
                <span>${pricing.subtotal.toLocaleString('en-US')}</span>
              </div>
              <div className="flex justify-between text-text-primary">
                <span>Cleaning fee</span>
                <span>${pricing.cleaningFee.toLocaleString('en-US')}</span>
              </div>
              <div className="flex justify-between text-text-primary">
                <span>Service fee</span>
                <span>${pricing.serviceFee.toLocaleString('en-US')}</span>
              </div>
              <div className="flex justify-between text-lg font-poppins font-semibold text-text-primary pt-3 border-t border-border">
                <span>Total</span>
                <span>${pricing.total.toLocaleString('en-US')}</span>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="text-center text-sm text-text-secondary pt-4">
            <p>You won't be charged yet</p>
          </div>
        </div>
      </div>

      {/* Mobile Expanded View */}
      {isExpanded && (
        <div className="md:hidden fixed inset-0 bg-background z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-poppins font-semibold">Reservation</h2>
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                iconName="X"
                iconSize={24}
              />
            </div>
            
            {/* Same content as above but in mobile layout */}
            <div className="space-y-6">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-poppins font-semibold text-text-primary">
                  ${property.pricePerNight.toLocaleString('en-US')}
                </span>
                <span className="text-text-secondary">per night</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-inter font-medium text-text-primary mb-1">
                      CHECK-IN
                    </label>
                    <Input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-inter font-medium text-text-primary mb-1">
                      CHECK-OUT
                    </label>
                    <Input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-inter font-medium text-text-primary mb-1">
                    GUESTS
                  </label>
                  <div className="flex items-center justify-between p-3 border border-border-input rounded-md">
                    <span className="text-text-primary">
                      {bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        onClick={decrementGuests}
                        disabled={bookingData.guests <= 1}
                        className="w-8 h-8 p-0 rounded-full"
                        iconName="Minus"
                        iconSize={16}
                      />
                      <Button
                        variant="ghost"
                        onClick={incrementGuests}
                        disabled={bookingData.guests >= property.maxGuests}
                        className="w-8 h-8 p-0 rounded-full"
                        iconName="Plus"
                        iconSize={16}
                      />
                    </div>
                  </div>
                </div>

                {pricing.nights > 0 && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-text-primary">
                      <span>
                        ${property.pricePerNight.toLocaleString('en-US')} × {pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}
                      </span>
                      <span>${pricing.subtotal.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between text-text-primary">
                      <span>Cleaning fee</span>
                      <span>${pricing.cleaningFee.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between text-text-primary">
                      <span>Service fee</span>
                      <span>${pricing.serviceFee.toLocaleString('en-US')}</span>
                    </div>
                    <div className="flex justify-between text-lg font-poppins font-semibold text-text-primary pt-3 border-t border-border">
                      <span>Total</span>
                      <span>${pricing.total.toLocaleString('en-US')}</span>
                    </div>
                  </div>
                )}

                <Button
                  variant="primary"
                  onClick={handleBooking}
                  className="w-full py-3 text-lg font-medium"
                >
                  Reserve
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingWidget;