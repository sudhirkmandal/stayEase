import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

const BookingsTab = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on component mount - only for current user
  useEffect(() => {
    const loadBookings = () => {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        
        // Filter bookings for current user only
        const userBookings = storedBookings.filter(booking => {
          // For backward compatibility, include bookings without userId for current user
          if (!booking.userId && isAuthenticated && user) {
            return true; // Assume old bookings belong to current user
          }
          return booking.userId === user?.id;
        });
        
        // Clean up old static bookings and validate data
        const cleanedBookings = userBookings.filter(booking => {
          // Remove bookings with static/mock data
          if (booking.property?.title === "Cozy apartment in the heart of Krakow" && 
              booking.property?.location === "Old Town, Krakow, Poland") {
            return false;
          }
          
          // Ensure booking has required dynamic data
          return booking.property && 
                 booking.property.title && 
                 booking.property.location && 
                 booking.checkInDate && 
                 booking.checkOutDate &&
                 booking.confirmationNumber;
        });
        
        // Update localStorage with cleaned data for current user only
        const otherUserBookings = storedBookings.filter(booking => {
          if (!booking.userId && isAuthenticated && user) {
            return false; // Remove old bookings from other users
          }
          return booking.userId !== user?.id;
        });
        
        const updatedAllBookings = [...otherUserBookings, ...cleanedBookings];
        localStorage.setItem('userBookings', JSON.stringify(updatedAllBookings));
        
        setBookings(cleanedBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
        setBookings([]);
      }
    };

    if (isAuthenticated && user) {
      loadBookings();
    } else {
      setBookings([]);
    }
  }, [isAuthenticated, user]);

  const filters = [
    { id: 'all', label: 'All', count: bookings.length },
    { id: 'property', label: 'Properties', count: bookings.filter(b => !b.type || b.type === 'property').length },
    { id: 'service', label: 'Services', count: bookings.filter(b => b.type === 'service').length },
    { id: 'experience', label: 'Experiences', count: bookings.filter(b => b.type === 'experience').length },
    { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : activeFilter === 'upcoming' || activeFilter === 'completed' || activeFilter === 'cancelled'
    ? bookings.filter(booking => booking.status === activeFilter)
    : bookings.filter(booking => {
        if (activeFilter === 'property') {
          return !booking.type || booking.type === 'property';
        }
        return booking.type === activeFilter;
      });

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { label: 'Confirmed', color: 'bg-primary text-primary-foreground' },
      completed: { label: 'Completed', color: 'bg-success text-success-foreground' },
      cancelled: { label: 'Cancelled', color: 'bg-error text-error-foreground' }
    };
    
    const config = statusConfig[status] || statusConfig.confirmed;
    return (
      <span className={`px-2 py-1 text-xs font-inter font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
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

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updatedBookings = storedBookings.map(booking => 
          booking.confirmationNumber === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        );
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
        
        // Update local state
        const updatedLocalBookings = bookings.map(booking => 
          booking.confirmationNumber === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        );
        setBookings(updatedLocalBookings);
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Error cancelling booking');
      }
    }
  };

  const handleViewDetails = (booking) => {
    // Navigate to booking details page
    navigate(`/booking-details/${booking.confirmationNumber}`);
  };

  const handleViewProperty = (booking) => {
    // Navigate to property detail page with booking info
    if (booking.property && booking.property.id) {
      navigate(`/property-detail/${booking.property.id}`);
    } else {
      alert('Property details not available');
    }
  };

  // Helper function to get location display
  const getLocationDisplay = (booking) => {
    if (booking.property && booking.property.location) {
      return booking.property.location;
    }
    return 'Location not available';
  };

  // Helper function to get host name
  const getHostName = (booking) => {
    if (booking.property && booking.property.host && booking.property.host.name) {
      return booking.property.host.name;
    }
    return 'Host information not available';
  };

  // Helper function to get host avatar
  const getHostAvatar = (booking) => {
    if (booking.property && booking.property.host && booking.property.host.avatar) {
      return booking.property.host.avatar;
    }
    return 'https://randomuser.me/api/portraits/lego/1.jpg'; // Default avatar
  };

  // Helper function to get booking title
  const getBookingTitle = (booking) => {
    if (booking.type === 'service' || booking.type === 'experience') {
      return booking.item?.title || 'Title not available';
    }
    return booking.property?.title || 'Property Title Not Available';
  };

  // Helper function to get booking image
  const getBookingImage = (booking) => {
    if (booking.type === 'service' || booking.type === 'experience') {
      return booking.item?.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop';
    }
    return booking.property?.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop';
  };

  // Helper function to get booking location
  const getBookingLocation = (booking) => {
    if (booking.type === 'service') {
      return 'Service Location';
    }
    if (booking.type === 'experience') {
      return booking.item?.location || 'Location not available';
    }
    return getLocationDisplay(booking);
  };

  // Helper function to get booking price
  const getBookingPrice = (booking) => {
    if (booking.type === 'service') {
      return booking.item?.price || '$0';
    }
    if (booking.type === 'experience') {
      const basePrice = booking.item?.price || '$0';
      const guests = booking.guests || 1;
      if (guests > 1) {
        const priceValue = parseFloat(basePrice.replace('$', ''));
        return `$${priceValue * guests} (${basePrice} × ${guests} guests)`;
      }
      return basePrice;
    }
    return formatPrice(booking.totalPrice);
  };

  // Helper function to get booking date info
  const getBookingDateInfo = (booking) => {
    if (booking.type === 'service' || booking.type === 'experience') {
      return {
        label: 'Scheduled for',
        date: booking.date,
        time: booking.time
      };
    }
    return {
      checkIn: booking.checkInDate,
      checkOut: booking.checkOutDate
    };
  };

  // Helper function to get booking type icon
  const getBookingTypeIcon = (booking) => {
    if (booking.type === 'service') {
      return 'Wrench';
    }
    if (booking.type === 'experience') {
      return 'Star';
    }
    return 'Home';
  };

  // Show message if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Lock" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-2">
          Authentication Required
        </h3>
        <p className="text-sm font-inter text-text-secondary mb-6">
          Please log in to view your bookings.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/login')}
          iconName="LogIn"
          iconPosition="left"
        >
          Log In
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-background border border-border rounded-lg p-1">
        <div className="flex flex-wrap gap-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-xs sm:text-sm font-inter font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <span className="truncate">{filter.label}</span>
              <span className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 ${
                activeFilter === filter.id
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-border text-text-secondary'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.confirmationNumber} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col md:flex-row">
                {/* Property Image */}
                <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
                  <Image
                    src={getBookingImage(booking)}
                    alt={getBookingTitle(booking)}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusBadge(booking.status)}
                        <span className="text-xs font-inter text-text-secondary truncate">
                          Booked {formatDate(booking.bookingDate)}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-poppins font-semibold text-text-primary mb-2 truncate">
                        {getBookingTitle(booking)}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon name="MapPin" size={16} className="text-text-secondary flex-shrink-0" />
                        <span className="text-sm font-inter text-text-secondary truncate">
                          {getBookingLocation(booking)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right mt-4 md:mt-0 flex-shrink-0">
                      <p className="text-lg font-poppins font-semibold text-text-primary">
                        {getBookingPrice(booking)}
                      </p>
                      <p className="text-xs font-inter text-text-secondary">
                        total
                      </p>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4">
                    {booking.type === 'service' || booking.type === 'experience' ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <Icon name="Calendar" size={16} className="text-text-secondary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-inter text-text-secondary">Date</p>
                            <p className="text-sm font-inter font-medium text-text-primary truncate">
                              {formatDate(booking.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={16} className="text-text-secondary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-inter text-text-secondary">Time</p>
                            <p className="text-sm font-inter font-medium text-text-primary truncate">
                              {booking.time || 'TBD'}
                            </p>
                          </div>
                        </div>
                        {booking.type === 'experience' && (
                          <div className="flex items-center space-x-2 sm:col-span-2 md:col-span-1">
                            <Icon name="Users" size={16} className="text-text-secondary flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-inter text-text-secondary">Guests</p>
                              <p className="text-sm font-inter font-medium text-text-primary">
                                {booking.guests || 1} {(booking.guests || 1) === 1 ? 'guest' : 'guests'}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2">
                          <Icon name="Calendar" size={16} className="text-text-secondary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-inter text-text-secondary">Check-in</p>
                            <p className="text-sm font-inter font-medium text-text-primary truncate">
                              {formatDate(booking.checkInDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Calendar" size={16} className="text-text-secondary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-inter text-text-secondary">Check-out</p>
                            <p className="text-sm font-inter font-medium text-text-primary truncate">
                              {formatDate(booking.checkOutDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:col-span-2 md:col-span-1">
                          <Icon name="Users" size={16} className="text-text-secondary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-inter text-text-secondary">Guests</p>
                            <p className="text-sm font-inter font-medium text-text-primary">
                              {booking.guests || 1} {(booking.guests || 1) === 1 ? 'guest' : 'guests'}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Host Info */}
                  {(booking.type === 'service' || booking.type === 'experience') ? (
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Icon name={getBookingTypeIcon(booking)} size={16} className="w-full h-full p-2 bg-primary/10 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-inter font-medium text-text-primary truncate">
                          {booking.type === 'service' ? 'Service Provider' : 'Experience Host'}
                        </p>
                        <p className="text-xs font-inter text-text-secondary truncate">
                          {booking.type === 'service' ? 'Professional Service' : booking.item?.category || 'Experience'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={getHostAvatar(booking)}
                          alt={getHostName(booking)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-inter font-medium text-text-primary truncate">
                          Host: {getHostName(booking)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Guest Info */}
                  {booking.guestInfo && (
                    <div className="bg-surface rounded-lg p-3 mb-4">
                      <p className="text-xs font-inter text-text-secondary mb-1">Guest Information</p>
                      <p className="text-sm font-inter font-medium text-text-primary truncate">
                        {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                      </p>
                      <p className="text-xs font-inter text-text-secondary truncate">
                        {booking.guestInfo.email}
                      </p>
                    </div>
                  )}

                  {/* Confirmation Number */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-inter text-text-secondary">Confirmation Number</p>
                        <p className="text-sm font-inter font-medium text-primary truncate">
                          #{booking.confirmationNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={() => handleViewDetails(booking)}
                      className="text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">View details</span>
                      <span className="sm:hidden">Details</span>
                    </Button>
                    
                    {booking.type !== 'service' && booking.type !== 'experience' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Home"
                        iconPosition="left"
                        onClick={() => handleViewProperty(booking)}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">View property</span>
                        <span className="sm:hidden">Property</span>
                      </Button>
                    )}
                    
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="X"
                        iconPosition="left"
                        className="text-error hover:text-error hover:border-error text-xs sm:text-sm"
                        onClick={() => handleCancelBooking(booking.confirmationNumber)}
                      >
                        <span className="hidden sm:inline">Cancel booking</span>
                        <span className="sm:hidden">Cancel</span>
                      </Button>
                    )}

                    {booking.status === 'completed' && (
                      <Button
                        variant="primary"
                        size="sm"
                        iconName="Star"
                        iconPosition="left"
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">
                          {booking.type === 'service' ? 'Rate service' : 
                           booking.type === 'experience' ? 'Rate experience' : 'Rate stay'}
                        </span>
                        <span className="sm:hidden">Rate</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-poppins font-semibold text-text-primary mb-2">
            No bookings found
          </h3>
          <p className="text-sm font-inter text-text-secondary mb-6 px-4">
            {activeFilter === 'all' 
              ? "You haven't made any bookings yet. Start exploring properties, services, and experiences to book your next adventure!"
              : activeFilter === 'property'
              ? "You haven't booked any properties yet. Start exploring accommodations for your next trip!"
              : activeFilter === 'service'
              ? "You haven't booked any services yet. Discover professional services to enhance your stay!"
              : activeFilter === 'experience'
              ? "You haven't booked any experiences yet. Find unique activities hosted by locals!"
              : `No ${activeFilter} bookings found.`
            }
          </p>
          <Button
            variant="primary"
            onClick={() => navigate(activeFilter === 'service' ? '/services' : activeFilter === 'experience' ? '/experiences' : '/homepage')}
            iconName="Search"
            iconPosition="left"
          >
            {activeFilter === 'service' ? 'Explore services' : 
             activeFilter === 'experience' ? 'Explore experiences' : 'Explore properties'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingsTab;