import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SavedPropertiesTab = () => {
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: 'Przytulny apartament w centrum Krakowa',
      location: 'Kraków, Małopolskie',
      price: 150,
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      hostName: 'Anna Kowalska',
      propertyType: 'Cały apartament',
      beds: 2,
      baths: 1,
      savedDate: '2024-01-15',
      isAvailable: true
    },
    {
      id: 2,
      title: 'Nowoczesne studio przy plaży',
      location: 'Gdańsk, Pomorskie',
      price: 120,
      rating: 4.9,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      hostName: 'Piotr Nowak',
      propertyType: 'Studio',
      beds: 1,
      baths: 1,
      savedDate: '2024-01-10',
      isAvailable: true
    },
    {
      id: 3,
      title: 'Luksusowa willa z basenem',
      location: 'Zakopane, Małopolskie',
      price: 300,
      rating: 4.7,
      reviewCount: 67,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      hostName: 'Maria Wiśniewska',
      propertyType: 'Cały dom',
      beds: 4,
      baths: 3,
      savedDate: '2024-01-08',
      isAvailable: false
    },
    {
      id: 4,
      title: 'Klimatyczny loft w Warszawie',
      location: 'Warszawa, Mazowieckie',
      price: 180,
      rating: 4.6,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      hostName: 'Tomasz Kowalski',
      propertyType: 'Loft',
      beds: 1,
      baths: 1,
      savedDate: '2024-01-05',
      isAvailable: true
    }
  ]);

  const [sortBy, setSortBy] = useState('recent');

  const handleRemoveFromSaved = (propertyId) => {
    setSavedProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const sortedProperties = [...savedProperties].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.savedDate) - new Date(a.savedDate);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header with Sort Options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-poppins font-semibold text-text-primary">
            Zapisane noclegi
          </h2>
          <p className="text-sm font-inter text-text-secondary">
            {savedProperties.length} {savedProperties.length === 1 ? 'zapisany nocleg' : 'zapisanych noclegów'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm font-inter text-text-secondary">Sortuj według:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border-input rounded-md text-sm font-inter text-text-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="recent">Ostatnio zapisane</option>
            <option value="price-low">Cena: od najniższej</option>
            <option value="price-high">Cena: od najwyższej</option>
            <option value="rating">Najwyżej oceniane</option>
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
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemoveFromSaved(property.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
                >
                  <Icon name="Heart" size={18} className="text-primary fill-current" />
                </button>
                {!property.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-error text-error-foreground text-sm font-inter font-medium rounded-full">
                      Niedostępny
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
                  <span>{property.propertyType}</span>
                  <span>•</span>
                  <span>{property.beds} {property.beds === 1 ? 'łóżko' : 'łóżka'}</span>
                  <span>•</span>
                  <span>{property.baths} {property.baths === 1 ? 'łazienka' : 'łazienki'}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-poppins font-semibold text-text-primary">
                      {formatPrice(property.price)}
                    </span>
                    <span className="text-sm font-inter text-text-secondary"> / noc</span>
                  </div>
                  <span className="text-xs font-inter text-text-secondary">
                    Zapisano {formatDate(property.savedDate)}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    disabled={!property.isAvailable}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    {property.isAvailable ? 'Zarezerwuj' : 'Niedostępny'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                  >
                    Zobacz
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
            Brak zapisanych noclegów
          </h3>
          <p className="text-sm font-inter text-text-secondary mb-6">
            Zapisuj noclegi, które Ci się podobają, aby łatwo je odnaleźć później
          </p>
          <Button
            variant="primary"
            iconName="Search"
            iconPosition="left"
          >
            Przeglądaj noclegi
          </Button>
        </div>
      )}

      {/* Quick Actions */}
      {savedProperties.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
            Szybkie akcje
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              fullWidth
            >
              Udostępnij listę
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Eksportuj PDF
            </Button>
            <Button
              variant="outline"
              iconName="Filter"
              iconPosition="left"
              fullWidth
            >
              Filtruj zapisane
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPropertiesTab;