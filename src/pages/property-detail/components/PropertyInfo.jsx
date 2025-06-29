import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyInfo = ({ property }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleAmenities = () => {
    setIsAmenitiesExpanded(!isAmenitiesExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Property Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-poppins font-semibold text-text-primary mb-2">
          {property.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="font-medium">{property.rating}</span>
            <span>({property.reviewCount} reviews)</span>
          </div>
          <span>•</span>
          <span>{property.location}</span>
        </div>
      </div>

      {/* Host Info */}
      <div className="flex items-center space-x-4 py-6 border-b border-border">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={property.host.avatar}
            alt={`${property.host.name} - host`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-inter font-medium text-text-primary">
            Host: {property.host.name}
          </h3>
          <p className="text-sm text-text-secondary">
            {property.host.joinedYear && `Joined in ${property.host.joinedYear}`}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {property.host.isSuperhost && (
            <div className="flex items-center space-x-1 bg-surface px-2 py-1 rounded">
              <Icon name="Award" size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">Superhost</span>
            </div>
          )}
        </div>
      </div>

      {/* Property Features */}
      <div className="space-y-4 py-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Users" size={20} className="text-text-secondary" />
          <span className="text-text-primary">
            {property.maxGuests} {property.maxGuests === 1 ? 'guest' : 'guests'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Bed" size={20} className="text-text-secondary" />
          <span className="text-text-primary">
            {property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Bath" size={20} className="text-text-secondary" />
          <span className="text-text-primary">
            {property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}
          </span>
        </div>
        {property.propertyType && (
          <div className="flex items-center space-x-3">
            <Icon name="Home" size={20} className="text-text-secondary" />
            <span className="text-text-primary">{property.propertyType}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="py-6 border-b border-border">
        <h2 className="text-xl font-poppins font-semibold text-text-primary mb-4">
          About this place
        </h2>
        <div className="text-text-primary leading-relaxed">
          <p className={`${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
            {property.description}
          </p>
          {property.description.length > 200 && (
            <Button
              variant="link"
              onClick={toggleDescription}
              className="mt-2 p-0 text-text-primary underline"
            >
              {isDescriptionExpanded ? 'Show less' : 'Show more'}
            </Button>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="py-6 border-b border-border">
        <h2 className="text-xl font-poppins font-semibold text-text-primary mb-4">
          What this place offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(isAmenitiesExpanded ? property.amenities : property.amenities.slice(0, 6)).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name={amenity.icon} size={20} className="text-text-secondary" />
              <span className="text-text-primary">{amenity.name}</span>
            </div>
          ))}
        </div>
        {property.amenities.length > 6 && (
          <Button
            variant="outline"
            onClick={toggleAmenities}
            className="mt-4"
          >
            {isAmenitiesExpanded 
              ? 'Show fewer amenities' 
              : `Show all ${property.amenities.length} amenities`
            }
          </Button>
        )}
      </div>

      {/* House Rules */}
      {property.houseRules && property.houseRules.length > 0 && (
        <div className="py-6 border-b border-border">
          <h2 className="text-xl font-poppins font-semibold text-text-primary mb-4">
            House rules
          </h2>
          <div className="space-y-2">
            {property.houseRules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon name="Check" size={16} className="text-success mt-1" />
                <span className="text-text-primary">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Host Contact */}
      <div className="py-6">
        <h2 className="text-xl font-poppins font-semibold text-text-primary mb-4">
          Contact host
        </h2>
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={property.host.avatar}
                alt={`${property.host.name} - host`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-inter font-medium text-text-primary">
                {property.host.name}
              </h3>
              <p className="text-sm text-text-secondary">
                Response time: {property.host.responseTime || 'within an hour'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Contact host
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;