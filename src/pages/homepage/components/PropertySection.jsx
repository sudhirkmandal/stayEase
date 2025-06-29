import React, { useRef } from 'react';
import PropertyCard from './PropertyCard';

import Button from '../../../components/ui/Button';

const PropertySection = ({ title, properties, showNavigation = true }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-poppins font-semibold text-text-primary">
            {title}
          </h2>
          
          {showNavigation && (
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={scrollLeft}
                className="w-10 h-10 p-0 rounded-full border border-border hover:border-text-secondary"
                iconName="ChevronLeft"
                iconSize={20}
              />
              <Button
                variant="ghost"
                onClick={scrollRight}
                className="w-10 h-10 p-0 rounded-full border border-border hover:border-text-secondary"
                iconName="ChevronRight"
                iconSize={20}
              />
            </div>
          )}
        </div>

        {/* Properties Grid/Scroll */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:space-x-0 md:overflow-visible"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((property) => (
              <div key={property.id} className="flex-shrink-0 w-72 md:w-auto">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySection;