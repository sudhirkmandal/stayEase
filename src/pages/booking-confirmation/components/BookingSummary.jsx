import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingSummary = ({ bookingData, isCollapsed, onToggleCollapse }) => {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  
  // Use dynamic pricing if available, otherwise calculate
  const basePrice = bookingData.pricePerNight * nights;
  const cleaningFee = bookingData.cleaningFee || 89;
  const serviceFee = bookingData.serviceFee || Math.round(basePrice * 0.14);
  const taxes = bookingData.taxes || Math.round(basePrice * 0.12);
  const totalPrice = bookingData.totalPrice || (basePrice + cleaningFee + serviceFee + taxes);

  return (
    <div className="bg-background border border-border rounded-lg shadow-sm">
      {/* Mobile Collapsible Header */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          onClick={onToggleCollapse}
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={bookingData.property.images[0]}
                alt={bookingData.property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-inter font-medium text-text-primary">
                {bookingData.property.title}
              </p>
              <p className="text-xs font-inter text-text-secondary">
                {formatPrice(totalPrice)} total cost
              </p>
            </div>
          </div>
          <Icon 
            name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
            size={20} 
            className="text-text-secondary" 
          />
        </Button>
      </div>

      {/* Summary Content */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="p-6">
          {/* Property Info */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={bookingData.property.images[0]}
                alt={bookingData.property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-poppins font-semibold text-text-primary mb-1">
                {bookingData.property.title}
              </h3>
              <p className="text-sm font-inter text-text-secondary mb-2">
                {bookingData.property.location}
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-inter font-medium text-text-primary">
                    {bookingData.property.rating}
                  </span>
                </div>
                <span className="text-sm font-inter text-text-secondary">
                  ({bookingData.property.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-sm font-inter font-medium text-text-primary">Dates</p>
                <p className="text-sm font-inter text-text-secondary">
                  {formatDate(bookingData.checkInDate)} - {formatDate(bookingData.checkOutDate)}
                </p>
              </div>
              <Button variant="ghost" className="text-sm text-primary hover:text-primary">
                Edit
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-sm font-inter font-medium text-text-primary">Guests</p>
                <p className="text-sm font-inter text-text-secondary">
                  {bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}
                </p>
              </div>
              <Button variant="ghost" className="text-sm text-primary hover:text-primary">
                Edit
              </Button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
              className="w-full flex items-center justify-between p-0 text-left"
            >
              <span className="text-sm font-inter font-medium text-text-primary">
                Price details
              </span>
              <Icon 
                name={showPriceBreakdown ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary" 
              />
            </Button>

            {showPriceBreakdown && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-text-secondary">
                    {formatPrice(bookingData.pricePerNight)} x {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span className="text-sm font-inter text-text-primary">
                    {formatPrice(basePrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-text-secondary">
                    Cleaning fee
                  </span>
                  <span className="text-sm font-inter text-text-primary">
                    {formatPrice(cleaningFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-text-secondary">
                    Service fee
                  </span>
                  <span className="text-sm font-inter text-text-primary">
                    {formatPrice(serviceFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-text-secondary">
                    Taxes
                  </span>
                  <span className="text-sm font-inter text-text-primary">
                    {formatPrice(taxes)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-4 border-t border-border">
            <span className="text-lg font-poppins font-semibold text-text-primary">
              Total (USD)
            </span>
            <span className="text-lg font-poppins font-semibold text-text-primary">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* Trust Signals */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-inter text-text-secondary">
                StayEase booking protection
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-inter text-text-secondary">
                Verified host
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="text-sm font-inter text-text-secondary">
                Secure payments
              </span>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="mt-6 p-4 bg-surface rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-inter font-medium text-text-primary mb-1">
                  Cancellation policy
                </p>
                <p className="text-xs font-inter text-text-secondary">
                  Free cancellation up to 48 hours before check-in. 
                  After that, a fee of 50% of the total cost applies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;