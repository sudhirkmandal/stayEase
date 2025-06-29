import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ property }) => {
  const [showExactLocation, setShowExactLocation] = useState(false);

  const nearbyAttractions = [
    {
      name: "Main Market Square",
      distance: "0.5 km",
      type: "Tourist attraction",
      icon: "MapPin"
    },
    {
      name: "Wawel Castle",
      distance: "1.2 km", 
      type: "Castle",
      icon: "Castle"
    },
    {
      name: "Kazimierz",
      distance: "0.8 km",
      type: "Historic district", 
      icon: "Building"
    },
    {
      name: "Galeria Krakowska",
      distance: "2.1 km",
      type: "Shopping center",
      icon: "ShoppingBag"
    }
  ];

  // Mock coordinates for Kraków
  const lat = 50.0647;
  const lng = 19.9450;

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-2xl font-poppins font-semibold text-text-primary mb-6">
        Location
      </h2>

      {/* Map Container */}
      <div className="mb-6">
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-surface">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`Location map - ${property.location}`}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`}
            className="border-0"
          />
          
          {/* Overlay for approximate location */}
          {!showExactLocation && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="bg-background rounded-lg p-4 text-center shadow-md">
                <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-text-primary mb-2">
                  Approximate location
                </p>
                <Button
                  variant="primary"
                  onClick={() => setShowExactLocation(true)}
                  className="text-sm"
                >
                  Show exact location
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location Description */}
      <div className="mb-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-3">
          {property.location}
        </h3>
        <p className="text-text-primary leading-relaxed">
          {property.locationDescription || `Excellent location in the heart of ${property.location}. Close to major tourist attractions, restaurants, and public transportation. Perfect place to explore the city and experience local culture.`}
        </p>
      </div>

      {/* Nearby Attractions */}
      <div className="mb-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
          Nearby attractions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyAttractions.map((attraction, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <Icon name={attraction.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-inter font-medium text-text-primary">
                  {attraction.name}
                </h4>
                <p className="text-sm text-text-secondary">
                  {attraction.type} • {attraction.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transportation */}
      <div>
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
          Transportation
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Train" size={20} className="text-text-secondary" />
            <div>
              <span className="text-text-primary font-medium">Main Station</span>
              <span className="text-text-secondary ml-2">• 1.5 km</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Plane" size={20} className="text-text-secondary" />
            <div>
              <span className="text-text-primary font-medium">Kraków-Balice Airport</span>
              <span className="text-text-secondary ml-2">• 18 km</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Bus" size={20} className="text-text-secondary" />
            <div>
              <span className="text-text-primary font-medium">Bus stop</span>
              <span className="text-text-secondary ml-2">• 200 m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;