import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import BookingSummary from './components/BookingSummary';
import GuestInformationForm from './components/GuestInformationForm';
import PaymentMethodForm from './components/PaymentMethodForm';
import BookingSuccessModal from './components/BookingSuccessModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(true);

  // Get dynamic booking data from navigation state
  const bookingState = location.state;
  
  // Check if we have proper dynamic data, if not redirect to homepage
  useEffect(() => {
    if (!bookingState || !bookingState.property) {
      alert('Please select a property and dates to make a booking.');
      navigate('/homepage');
      return;
    }
  }, [bookingState, navigate]);
  
  // Fallback data if no state is passed (for direct navigation)
  const [bookingData] = useState(() => {
    if (bookingState && bookingState.property) {
      // Use dynamic data from navigation state
      return {
        property: bookingState.property,
        checkInDate: bookingState.bookingData?.checkIn || "2024-03-15",
        checkOutDate: bookingState.bookingData?.checkOut || "2024-03-18",
        guests: bookingState.bookingData?.guests || 2,
        pricePerNight: bookingState.property.pricePerNight || 280,
        totalPrice: bookingState.pricing?.total || 1127,
        guestEmail: user?.email || "guest@example.com"
      };
    } else {
      // If no dynamic data, redirect to homepage
      navigate('/homepage');
      return null;
    }
  });

  // Initialize guest info with user data if available
  const [guestInfo, setGuestInfo] = useState(() => {
    if (user) {
      // Split user name into first and last name
      const nameParts = user.name ? user.name.split(' ') : ['', ''];
      return {
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
        specialRequests: '',
        travelPurpose: '',
        emailUpdates: true,
        smsUpdates: false,
        totalGuests: bookingData.guests
      };
    } else {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: '',
        travelPurpose: '',
        emailUpdates: true,
        smsUpdates: false,
        totalGuests: bookingData.guests
      };
    }
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: user?.name || '',
    country: 'US',
    postalCode: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterSignup, setNewsletterSignup] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleGuestInfoChange = (field, value) => {
    setGuestInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredGuestFields = ['firstName', 'lastName', 'email', 'phone'];
    const guestFieldsValid = requiredGuestFields.every(field => 
      guestInfo[field] && guestInfo[field].trim() !== ''
    );

    if (paymentInfo.method === 'card') {
      const requiredPaymentFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
      const paymentFieldsValid = requiredPaymentFields.every(field => 
        paymentInfo[field] && paymentInfo[field].trim() !== ''
      );
      return guestFieldsValid && paymentFieldsValid && termsAccepted;
    }

    return guestFieldsValid && termsAccepted;
  };

  const generateConfirmationNumber = () => {
    return 'AC' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleBookingSubmit = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields and accept the terms and conditions.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newConfirmationNumber = generateConfirmationNumber();
      setConfirmationNumber(newConfirmationNumber);
      
      // Store booking in localStorage with user ID
      const booking = {
        ...bookingData,
        guestInfo,
        paymentInfo,
        confirmationNumber: newConfirmationNumber,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        userId: user?.id || 'anonymous' // Add user ID to booking
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while processing your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/user-profile?tab=bookings');
  };

  // Don't render if no booking data
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  // Show loading if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BookingProgressIndicator />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-poppins font-semibold text-text-primary mb-2">
              Confirm and pay
            </h1>
            <p className="text-sm font-inter text-text-secondary">
              Your trip is almost ready! Fill in the final details to confirm your booking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Guest Information */}
              <div className="bg-background border border-border rounded-lg p-6">
                <GuestInformationForm
                  onGuestInfoChange={handleGuestInfoChange}
                  guestInfo={guestInfo}
                />
              </div>

              {/* Payment Method */}
              <div className="bg-background border border-border rounded-lg p-6">
                <PaymentMethodForm
                  onPaymentInfoChange={handlePaymentInfoChange}
                  paymentInfo={paymentInfo}
                />
              </div>

              {/* Terms and Conditions */}
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
                  Terms and conditions
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                      required
                    />
                    <div>
                      <span className="text-sm font-inter font-medium text-text-primary">
                        I accept the terms and cancellation policy *
                      </span>
                      <p className="text-xs font-inter text-text-secondary mt-1">
                        Read the{' '}
                        <a href="#" className="text-primary hover:underline">
                          service terms
                        </a>
                        {' '}and{' '}
                        <a href="#" className="text-primary hover:underline">
                          cancellation policy
                        </a>
                        {' '}for this booking.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletterSignup}
                      onChange={(e) => setNewsletterSignup(e.target.checked)}
                      className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-inter font-medium text-text-primary">
                        I want to receive newsletter with special offers
                      </span>
                      <p className="text-xs font-inter text-text-secondary mt-1">
                        Receive exclusive offers, travel tips, and updates. 
                        You can unsubscribe at any time.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Privacy Notice */}
                <div className="mt-6 p-4 bg-surface rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={16} className="text-text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm font-inter font-medium text-text-primary mb-1">
                        Data protection
                      </p>
                      <p className="text-xs font-inter text-text-secondary">
                        Your data is protected in accordance with GDPR. We use it only 
                        for booking management and communication. Details in{' '}
                        <a href="#" className="text-primary hover:underline">
                          privacy policy
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <div className="hidden lg:block">
                <Button
                  variant="primary"
                  onClick={handleBookingSubmit}
                  disabled={!validateForm() || isLoading}
                  loading={isLoading}
                  className="w-full py-4 text-lg font-semibold"
                  iconName={isLoading ? undefined : "CreditCard"}
                  iconPosition="left"
                >
                  {isLoading ? 'Processing...' : 'Confirm and pay'}
                </Button>
                <p className="text-xs font-inter text-text-secondary text-center mt-3">
                  Payment will only be charged after host confirmation
                </p>
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-32">
                <BookingSummary
                  bookingData={bookingData}
                  isCollapsed={isSummaryCollapsed}
                  onToggleCollapse={() => setIsSummaryCollapsed(!isSummaryCollapsed)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Submit Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
          <Button
            variant="primary"
            onClick={handleBookingSubmit}
            disabled={!validateForm() || isLoading}
            loading={isLoading}
            className="w-full py-4 text-lg font-semibold"
            iconName={isLoading ? undefined : "CreditCard"}
            iconPosition="left"
          >
            {isLoading ? 'Processing...' : 'Confirm and pay'}
          </Button>
          <p className="text-xs font-inter text-text-secondary text-center mt-2">
            Payment will only be charged after host confirmation
          </p>
        </div>

        {/* Add bottom padding for mobile button */}
        <div className="lg:hidden h-24"></div>
      </div>

      {/* Success Modal */}
      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        bookingData={bookingData}
        confirmationNumber={confirmationNumber}
      />
    </div>
  );
};

export default BookingConfirmation;