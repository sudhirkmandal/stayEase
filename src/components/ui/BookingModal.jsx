import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';

const BookingModal = ({ isOpen, onClose, item, type = 'service' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: 1,
    specialRequests: '',
    contactPhone: user?.phone || '',
    contactEmail: user?.email || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if we should complete a booking after login
  useEffect(() => {
    if (location.state?.completeBooking && location.state?.bookingData && isAuthenticated) {
      const savedBookingData = location.state.bookingData;
      setBookingData(prev => ({
        ...prev,
        ...savedBookingData,
        contactPhone: user?.phone || savedBookingData.contactPhone || '',
        contactEmail: user?.email || savedBookingData.contactEmail || ''
      }));
      
      // Clear the navigation state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, isAuthenticated, user, navigate, location.pathname]);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      // Redirect to login with return path
      navigate('/login', { 
        state: { 
          returnPath: window.location.pathname,
          bookingData: { item, type, ...bookingData }
        } 
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store booking in localStorage
      const booking = {
        id: Date.now().toString(),
        type: type, // 'service' or 'experience'
        item: item,
        ...bookingData,
        userId: user.id,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        confirmationNumber: 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase()
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      
      // Show success message and close modal
      alert(`Booking confirmed! Your confirmation number is: ${booking.confirmationNumber}`);
      onClose();
      
      // Optionally redirect to user profile bookings tab
      navigate('/user-profile?tab=bookings');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while processing your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriceDisplay = () => {
    if (type === 'service') {
      return item.price;
    } else {
      // For experiences, calculate total based on guests
      const basePrice = parseFloat(item.price.replace('$', ''));
      const totalPrice = basePrice * bookingData.guests;
      return `$${totalPrice} ($${basePrice} × ${bookingData.guests} guests)`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-poppins font-semibold text-text-primary">
              Book {type === 'service' ? 'Service' : 'Experience'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Item Details */}
          <div className="mb-6">
            <div className="flex items-start space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-poppins font-semibold text-text-primary mb-1">
                  {item.title}
                </h3>
                {type === 'experience' && (
                  <p className="text-sm text-text-secondary mb-1">
                    <Icon name="MapPin" size={14} className="inline mr-1" />
                    {item.location}
                  </p>
                )}
                <p className="text-sm text-text-secondary">
                  {type === 'service' ? item.description : `${item.duration} • ${item.category}`}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                Date
              </label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                Time
              </label>
              <input
                type="time"
                value={bookingData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Guests (for experiences) */}
            {type === 'experience' && (
              <div>
                <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                  Number of Guests
                </label>
                <select
                  value={bookingData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                value={bookingData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={bookingData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-6 p-4 bg-surface rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-inter font-medium text-text-primary">Total Price:</span>
              <span className="font-poppins font-bold text-primary text-lg">
                {getPriceDisplay()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              className="flex-1"
              disabled={isLoading || !bookingData.date || !bookingData.time}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Book ${type === 'service' ? 'Service' : 'Experience'}`
              )}
            </Button>
          </div>
          
          {!isAuthenticated && (
            <p className="text-sm text-text-secondary text-center mt-3">
              You'll be redirected to login to complete your booking
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 