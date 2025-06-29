import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SaveButton from '../../../components/ui/SaveButton';

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property-detail/${property.id}`, { state: { property } });
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div 
      className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </>
        )}

        {/* Save Button */}
        <SaveButton 
          property={property}
          className="absolute top-3 right-3"
          size="sm"
        />

        {/* Image Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-background' : 'bg-background/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* New Badge */}
        {property.isNew && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-inter font-semibold">
            NEW
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Location and Rating */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-inter font-semibold text-text-primary truncate">
            {property.location}
          </h3>
          {property.rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-inter text-text-primary">
                {property.rating}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <p className="text-sm font-inter text-text-secondary mb-2 line-clamp-2">
          {property.title}
        </p>

        {/* Dates */}
        <p className="text-sm font-inter text-text-secondary mb-3">
          {property.availableDates}
        </p>

        {/* Price */}
        <div className="flex items-baseline space-x-1">
          <span className="text-base font-inter font-semibold text-text-primary">
            ${property.price}
          </span>
          <span className="text-sm font-inter text-text-secondary">
            night
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;