import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const BookingDetails = () => {
  const { confirmationNumber } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooking = () => {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const foundBooking = storedBookings.find(b => b.confirmationNumber === confirmationNumber);
        
        if (foundBooking) {
          // Check if the booking belongs to the current user
          if (isAuthenticated && user) {
            // For backward compatibility, allow access to bookings without userId for current user
            if (!foundBooking.userId || foundBooking.userId === user.id) {
              setBooking(foundBooking);
            } else {
              setError('Access denied. This booking does not belong to you.');
            }
          } else {
            setError('Authentication required to view booking details.');
          }
        } else {
          setError('Booking not found');
        }
      } catch (error) {
        console.error('Error loading booking:', error);
        setError('Error loading booking details');
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [confirmationNumber, isAuthenticated, user]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { label: 'Confirmed', color: 'bg-primary text-primary-foreground' },
      completed: { label: 'Completed', color: 'bg-success text-success-foreground' },
      cancelled: { label: 'Cancelled', color: 'bg-error text-error-foreground' }
    };
    
    const config = statusConfig[status] || statusConfig.confirmed;
    return (
      <span className={`px-3 py-1 text-sm font-inter font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleCancelBooking = () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updatedBookings = storedBookings.map(b => 
          b.confirmationNumber === confirmationNumber 
            ? { ...b, status: 'cancelled' }
            : b
        );
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
        setBooking({ ...booking, status: 'cancelled' });
        alert('Booking cancelled successfully');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Error cancelling booking');
      }
    }
  };

  const handleViewProperty = () => {
    if (booking?.property?.id) {
      navigate(`/property-detail/${booking.property.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-surface">
        <NavigationHeader />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertCircle" size={32} className="text-text-secondary" />
              </div>
              <h3 className="text-lg font-poppins font-semibold text-text-primary mb-2">
                Booking Not Found
              </h3>
              <p className="text-sm font-inter text-text-secondary mb-6">
                The booking you're looking for doesn't exist or has been removed.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/homepage')}
                iconName="Home"
                iconPosition="left"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <NavigationHeader />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-text-primary mb-2">
                  Booking Details
                </h1>
                <p className="text-sm font-inter text-text-secondary truncate">
                  Confirmation #{booking.confirmationNumber}
                </p>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {getStatusBadge(booking.status)}
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Property Image */}
              <div className="lg:w-1/3">
                <Image
                  src={booking.property?.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'}
                  alt={booking.property?.title || 'Property'}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="lg:w-2/3 p-4 sm:p-6">
                <div className="space-y-6">
                  {/* Property Info */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-poppins font-semibold text-text-primary mb-2 truncate">
                      {booking.property?.title || 'Property Title Not Available'}
                    </h2>
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon name="MapPin" size={16} className="text-text-secondary flex-shrink-0" />
                      <span className="text-sm font-inter text-text-secondary truncate">
                        {booking.property?.location || 'Location not available'}
                      </span>
                    </div>
                  </div>

                  {/* Booking Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Calendar" size={20} className="text-text-secondary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-inter text-text-secondary">Check-in</p>
                        <p className="text-sm font-inter font-medium text-text-primary truncate">
                          {formatDate(booking.checkInDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Calendar" size={20} className="text-text-secondary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-inter text-text-secondary">Check-out</p>
                        <p className="text-sm font-inter font-medium text-text-primary truncate">
                          {formatDate(booking.checkOutDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Users" size={20} className="text-text-secondary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-inter text-text-secondary">Guests</p>
                        <p className="text-sm font-inter font-medium text-text-primary">
                          {booking.guests || 1} {(booking.guests || 1) === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="DollarSign" size={20} className="text-text-secondary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-inter text-text-secondary">Total Price</p>
                        <p className="text-sm font-inter font-medium text-text-primary">
                          {formatPrice(booking.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Host Info */}
                  {booking.property?.host && (
                    <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={booking.property.host.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                          alt={booking.property.host.name || 'Host'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-inter font-medium text-text-primary truncate">
                          Host: {booking.property.host.name || 'Host information not available'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Guest Info */}
                  {booking.guestInfo && (
                    <div className="p-4 bg-surface rounded-lg">
                      <h3 className="text-sm font-inter font-medium text-text-primary mb-2">Guest Information</h3>
                      <div className="space-y-1">
                        <p className="text-sm font-inter text-text-primary truncate">
                          {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                        </p>
                        <p className="text-xs font-inter text-text-secondary truncate">
                          {booking.guestInfo.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Confirmation Number */}
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-inter text-text-secondary">Confirmation Number</p>
                        <p className="text-sm font-inter font-medium text-primary truncate">
                          #{booking.confirmationNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={handleViewProperty}
                      className="text-sm"
                    >
                      <span className="hidden sm:inline">View Property</span>
                      <span className="sm:hidden">Property</span>
                    </Button>
                    
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="outline"
                        iconName="X"
                        iconPosition="left"
                        className="text-error hover:text-error hover:border-error text-sm"
                        onClick={handleCancelBooking}
                      >
                        <span className="hidden sm:inline">Cancel Booking</span>
                        <span className="sm:hidden">Cancel</span>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      iconName="ArrowLeft"
                      iconPosition="left"
                      onClick={() => navigate('/homepage')}
                      className="text-sm"
                    >
                      <span className="hidden sm:inline">Back to Homepage</span>
                      <span className="sm:hidden">Home</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails; 