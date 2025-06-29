import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SaveButton from '../../../components/ui/SaveButton';
import BookingWidget from './BookingWidget';

const MobileBookingBar = ({ property }) => {
  const [showBookingWidget, setShowBookingWidget] = useState(false);

  return (
    <>
      {/* Fixed Bottom Bar - Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-poppins font-semibold text-text-primary">
                  ${property.pricePerNight.toLocaleString('en-US')}
                </span>
                <span className="text-sm text-text-secondary">per night</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm text-text-primary">{property.rating}</span>
                <span className="text-sm text-text-secondary">
                  ({property.reviewCount})
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <SaveButton property={property} size="sm" />
            
            <Button
              variant="primary"
              onClick={() => setShowBookingWidget(true)}
              className="px-6"
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Booking Widget Modal */}
      {showBookingWidget && (
        <div className="md:hidden fixed inset-0 bg-background z-50 overflow-y-auto">
          <div className="min-h-full">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-poppins font-semibold text-text-primary">
                Reservation
              </h2>
              <Button
                variant="ghost"
                onClick={() => setShowBookingWidget(false)}
                className="w-8 h-8 p-0"
                iconName="X"
                iconSize={20}
              />
            </div>
            
            {/* Booking Widget Content */}
            <div className="p-4">
              <BookingWidget 
                property={property} 
                className="border-0 shadow-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBookingBar;