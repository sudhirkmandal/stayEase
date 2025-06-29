import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';

const SavedPropertiesTab = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  // Load saved properties from localStorage
  useEffect(() => {
    const loadSavedProperties = () => {
      try {
        const storedSaved = JSON.parse(localStorage.getItem('savedProperties') || '[]');
        
        // Filter saved properties for current user only
        const userSavedProperties = storedSaved.filter(item => {
          if (!item.userId && isAuthenticated && user) {
            return true; // Assume old saved items belong to current user
          }
          return item.userId === user?.id;
        });
        
        setSavedProperties(userSavedProperties);
      } catch (error) {
        console.error('Error loading saved properties:', error);
        setSavedProperties([]);
      }
    };

    if (isAuthenticated && user) {
      loadSavedProperties();
    } else {
      setSavedProperties([]);
    }
  }, [isAuthenticated, user]);

  const handleRemoveFromSaved = (propertyId) => {
    try {
      const updatedSaved = savedProperties.filter(property => property.id !== propertyId);
      setSavedProperties(updatedSaved);
      
      // Update localStorage
      const allSaved = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      const otherUserSaved = allSaved.filter(item => item.userId !== user?.id);
      const updatedAllSaved = [...otherUserSaved, ...updatedSaved];
      localStorage.setItem('savedProperties', JSON.stringify(updatedAllSaved));
    } catch (error) {
      console.error('Error removing from saved:', error);
    }
  };

  const handleViewProperty = (property) => {
    navigate(`/property-detail/${property.id}`);
  };

  const handleBookProperty = (property) => {
    navigate(`/property-detail/${property.id}`, {
      state: { 
        property: property,
        bookingData: {
          checkIn: new Date().toISOString().split('T')[0],
          checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          guests: 2
        }
      }
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'Recently';
    }
  };

  const sortedProperties = [...savedProperties].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.savedDate || 0) - new Date(a.savedDate || 0);
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

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
          Please log in to view your saved properties.
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
      {/* Header with Sort Options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-poppins font-semibold text-text-primary">
            Saved Properties
          </h2>
          <p className="text-sm font-inter text-text-secondary">
            {savedProperties.length} {savedProperties.length === 1 ? 'saved property' : 'saved properties'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm font-inter text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm font-inter text-text-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="recent">Recently saved</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      {sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
            <div key={property.id} className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Property Image */}
              <div className="relative h-48">
                <Image
                  src={property.image || property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveFromSaved(property.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
                >
                  <Icon name="Heart" size={18} className="text-primary fill-current" />
                </button>
                {property.isNew && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-inter font-medium rounded-full">
                      New
                    </span>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-poppins font-semibold text-text-primary line-clamp-2 flex-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-inter font-medium text-text-primary">
                      {property.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-2">
                  <Icon name="MapPin" size={14} className="text-text-secondary" />
                  <span className="text-sm font-inter text-text-secondary">
                    {property.location}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-3 text-xs font-inter text-text-secondary">
                  <span>{property.category || 'Property'}</span>
                  {property.beds && (
                    <>
                      <span>•</span>
                      <span>{property.beds} {property.beds === 1 ? 'bed' : 'beds'}</span>
                    </>
                  )}
                  {property.baths && (
                    <>
                      <span>•</span>
                      <span>{property.baths} {property.baths === 1 ? 'bath' : 'baths'}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-poppins font-semibold text-text-primary">
                      {formatPrice(property.price)}
                    </span>
                    <span className="text-sm font-inter text-text-secondary"> / night</span>
                  </div>
                  <span className="text-xs font-inter text-text-secondary">
                    Saved {formatDate(property.savedDate)}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => handleBookProperty(property)}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleViewProperty(property)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-background border border-border rounded-lg p-12 text-center">
          <Icon name="Heart" size={64} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-poppins font-semibold text-text-primary mb-2">
            No saved properties
          </h3>
          <p className="text-sm font-inter text-text-secondary mb-6">
            Save properties you like to easily find them later
          </p>
          <Button
            variant="primary"
            iconName="Search"
            iconPosition="left"
            onClick={() => navigate('/homepage')}
          >
            Browse properties
          </Button>
        </div>
      )}

      {/* Quick Actions */}
      {savedProperties.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              fullWidth
            >
              Share list
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              iconName="Filter"
              iconPosition="left"
              fullWidth
            >
              Filter saved
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPropertiesTab;