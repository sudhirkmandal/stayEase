import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';

const TrendingDestinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: 'Krakow',
      properties: 1247,
      image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg',
      description: 'Historic center and culture'
    },
    {
      id: 2,
      name: 'Warsaw',
      properties: 892,
      image: 'https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg',
      description: 'Modern city and business'
    },
    {
      id: 3,
      name: 'Gdansk',
      properties: 634,
      image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
      description: 'Seaside climate and architecture'
    },
    {
      id: 4,
      name: 'Wroclaw',
      properties: 521,
      image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
      description: 'City of bridges and gnomes'
    },
    {
      id: 5,
      name: 'Zakopane',
      properties: 387,
      image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
      description: 'Highland capital and Tatra Mountains'
    },
    {
      id: 6,
      name: 'Poznan',
      properties: 298,
      image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
      description: 'Cradle of Polish statehood'
    }
  ];

  const handleDestinationClick = (destination) => {
    navigate(`/homepage?location=${encodeURIComponent(destination.name)}`);
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-text-primary mb-4">
            Popular destinations in Poland
          </h2>
          <p className="text-lg font-inter text-text-secondary max-w-2xl mx-auto">
            Discover the most chosen places by travelers and find your perfect accommodation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group cursor-pointer bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-poppins font-bold mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm font-inter opacity-90 mb-2">
                    {destination.description}
                  </p>
                  <p className="text-sm font-inter font-medium">
                    {destination.properties.toLocaleString('en-US')} properties
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinations;