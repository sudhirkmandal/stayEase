import React, { useState } from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const PropertyImageGallery = ({ images, propertyName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-2 md:h-96">
          {/* Main Image */}
          <div className="md:col-span-2 relative overflow-hidden rounded-l-lg">
            <Image
              src={images[0]}
              alt={`${propertyName} - główne zdjęcie`}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={openFullscreen}
            />
          </div>
          
          {/* Thumbnail Grid */}
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={image}
                  alt={`${propertyName} - zdjęcie ${index + 2}`}
                  className={`w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300 ${
                    index === 1 ? 'rounded-tr-lg' : index === 3 ? 'rounded-br-lg' : ''
                  }`}
                  onClick={openFullscreen}
                />
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      onClick={openFullscreen}
                      className="text-white hover:text-white"
                      iconName="Grid3X3"
                      iconSize={20}
                    >
                      +{images.length - 5} więcej
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden relative">
          <div className="relative h-64 overflow-hidden rounded-lg">
            <Image
              src={images[currentImageIndex]}
              alt={`${propertyName} - zdjęcie ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full"
              iconName="ChevronLeft"
              iconSize={16}
            />
            <Button
              variant="ghost"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full"
              iconName="ChevronRight"
              iconSize={16}
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Show All Photos Button - Desktop */}
        <div className="hidden md:block absolute bottom-4 right-4">
          <Button
            variant="outline"
            onClick={openFullscreen}
            className="bg-white hover:bg-surface"
            iconName="Grid3X3"
            iconPosition="left"
          >
            Pokaż wszystkie zdjęcia
          </Button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white hover:text-white z-10 w-10 h-10"
              iconName="X"
              iconSize={24}
            />
            
            {/* Navigation */}
            <Button
              variant="ghost"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white w-12 h-12"
              iconName="ChevronLeft"
              iconSize={24}
            />
            <Button
              variant="ghost"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white w-12 h-12"
              iconName="ChevronRight"
              iconSize={24}
            />
            
            {/* Current Image */}
            <div className="max-w-4xl max-h-full">
              <Image
                src={images[currentImageIndex]}
                alt={`${propertyName} - zdjęcie ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} z {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyImageGallery;