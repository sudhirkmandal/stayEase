import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingSuccessModal = ({ isOpen, onClose, bookingData, confirmationNumber }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

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
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewBookingDetails = () => {
    navigate(`/booking-details/${confirmationNumber}`);
    onClose();
  };

  const handleViewAllBookings = () => {
    navigate('/bookings');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={24} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-poppins font-semibold text-text-primary">
                  Booking confirmed!
                </h2>
                <p className="text-sm font-inter text-text-secondary">
                  Booking number: #{confirmationNumber}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              iconName="X"
              className="w-8 h-8 p-0"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Success Message */}
          <div className="text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} color="white" />
            </div>
            <h3 className="text-lg font-poppins font-semibold text-text-primary mb-2">
              Great! Your booking has been confirmed
            </h3>
            <p className="text-sm font-inter text-text-secondary">
              Booking details have been sent to your email address. 
              You can also find them in the "My Trips" section.
            </p>
          </div>

          {/* Property Info */}
          <div className="flex items-start space-x-4 p-4 bg-surface rounded-lg">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={bookingData.property.images[0]}
                alt={bookingData.property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-md font-poppins font-semibold text-text-primary mb-1">
                {bookingData.property.title}
              </h4>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-inter font-medium text-text-primary mb-2">
                  Check-in
                </h4>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-text-secondary" />
                  <div>
                    <p className="text-sm font-inter text-text-primary">
                      {formatDate(bookingData.checkInDate)}
                    </p>
                    <p className="text-xs font-inter text-text-secondary">
                      After {formatTime(bookingData.checkInDate)} (3:00 PM)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-inter font-medium text-text-primary mb-2">
                  Check-out
                </h4>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-text-secondary" />
                  <div>
                    <p className="text-sm font-inter text-text-primary">
                      {formatDate(bookingData.checkOutDate)}
                    </p>
                    <p className="text-xs font-inter text-text-secondary">
                      Until {formatTime(bookingData.checkOutDate)} (11:00 AM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-inter font-medium text-text-primary mb-2">
                  Guests
                </h4>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-text-secondary" />
                  <p className="text-sm font-inter text-text-primary">
                    {bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-inter font-medium text-text-primary mb-2">
                  Total cost
                </h4>
                <div className="flex items-center space-x-2">
                  <Icon name="CreditCard" size={16} className="text-text-secondary" />
                  <p className="text-lg font-poppins font-semibold text-text-primary">
                    {formatPrice(bookingData.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Host Contact */}
          <div className="p-4 bg-surface rounded-lg">
            <h4 className="text-md font-inter font-medium text-text-primary mb-3">
              Contact host
            </h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={bookingData.property.host.avatar}
                  alt={bookingData.property.host.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-inter font-medium text-text-primary">
                  {bookingData.property.host.name}
                </p>
                <p className="text-xs font-inter text-text-secondary">
                  Host since {bookingData.property.host.memberSince}
                </p>
              </div>
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
                className="text-sm"
              >
                Send message
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="text-md font-inter font-medium text-text-primary mb-3">
              What's next?
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="Mail" size={16} className="text-success mt-0.5" />
                <div>
                  <p className="text-sm font-inter font-medium text-text-primary">
                    Check your email
                  </p>
                  <p className="text-xs font-inter text-text-secondary">
                    Booking confirmation has been sent to {bookingData.guestEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon name="MessageSquare" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-inter font-medium text-text-primary">
                    Contact the host
                  </p>
                  <p className="text-xs font-inter text-text-secondary">
                    Inform about arrival time and ask questions about your stay
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-inter font-medium text-text-primary">
                    Prepare for your trip
                  </p>
                  <p className="text-xs font-inter text-text-secondary">
                    Check directions, property rules, and prepare documents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => window.print()}
              iconName="Download"
              iconPosition="left"
              className="flex-1"
            >
              Download confirmation
            </Button>
            <Button
              variant="primary"
              onClick={handleViewBookingDetails}
              iconName="Eye"
              iconPosition="left"
              className="flex-1"
            >
              View booking details
            </Button>
          </div>
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleViewAllBookings}
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              View all bookings
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/homepage')}
              className="flex-1 text-text-secondary hover:text-primary"
            >
              Back to homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;