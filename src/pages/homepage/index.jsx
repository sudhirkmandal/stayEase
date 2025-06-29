import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import HeroSearchSection from './components/HeroSearchSection';
import CategoryFilter from './components/CategoryFilter';
import PropertySection from './components/PropertySection';
import TrendingDestinations from './components/TrendingDestinations';
import HostPromotionBanner from './components/HostPromotionBanner';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Homepage = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Get search parameters from URL
  const searchLocation = searchParams.get('location');
  const searchCheckIn = searchParams.get('checkIn');
  const searchCheckOut = searchParams.get('checkOut');
  const searchGuests = parseInt(searchParams.get('guests')) || 1;
  const hasSearchParams = searchLocation || searchCheckIn || searchCheckOut;

  // Mock properties data
  const mockProperties = [
    {
      id: 1,
      title: "Cozy apartment in the heart of Krakow with Wawel Castle view",
      location: "Krakow, Lesser Poland",
      price: 280,
      rating: 4.9,
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
      ],
      availableDates: "Jan 15-20",
      category: "apartment",
      isNew: true,
      isFavorite: false,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1
    },
    {
      id: 2,
      title: "Luxury villa with pool in Zakopane",
      location: "Zakopane, Lesser Poland",
      price: 650,
      rating: 4.8,
      images: [
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
      ],
      availableDates: "Jan 22-27",
      category: "villa",
      isNew: false,
      isFavorite: true,
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 3,
      title: "Modern house by the sea in Gdansk",
      location: "Gdansk, Pomerania",
      price: 420,
      rating: 4.7,
      images: [
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
      ],
      availableDates: "Feb 1-6",
      category: "house",
      isNew: true,
      isFavorite: false,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 4,
      title: "Stylish loft in the center of Warsaw",
      location: "Warsaw, Masovia",
      price: 380,
      rating: 4.6,
      images: [
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
      ],
      availableDates: "Feb 10-15",
      category: "apartment",
      isNew: false,
      isFavorite: false,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: 5,
      title: "Romantic cabin in the mountains",
      location: "Karpacz, Lower Silesia",
      price: 320,
      rating: 4.9,
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
      ],
      availableDates: "Feb 18-23",
      category: "cabin",
      isNew: false,
      isFavorite: true,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1
    },
    {
      id: 6,
      title: "Elegant apartment by the beach",
      location: "Sopot, Pomerania",
      price: 480,
      rating: 4.8,
      images: [
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
      ],
      availableDates: "Feb 25 - Mar 2",
      category: "beachfront",
      isNew: true,
      isFavorite: false,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 2
    },
    {
      id: 7,
      title: "Historic house in Old Town",
      location: "Wroclaw, Lower Silesia",
      price: 350,
      rating: 4.7,
      images: [
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
      ],
      availableDates: "Mar 5-10",
      category: "house",
      isNew: false,
      isFavorite: false,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 8,
      title: "Luxury penthouse with terrace",
      location: "Poznan, Greater Poland",
      price: 720,
      rating: 4.9,
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"
      ],
      availableDates: "Mar 12-17",
      category: "luxury",
      isNew: true,
      isFavorite: true,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2
    }
  ];

  const popularProperties = mockProperties.slice(0, 6);
  const newProperties = mockProperties.filter(p => p.isNew);
  const luxuryProperties = mockProperties.filter(p => p.category === 'luxury' || p.price > 500);

  // Filter properties based on search criteria
  const filterPropertiesBySearch = (properties) => {
    if (!hasSearchParams) {
      return properties;
    }

    return properties.filter(property => {
      // Filter by location (case-insensitive partial match)
      if (searchLocation && !property.location.toLowerCase().includes(searchLocation.toLowerCase())) {
        return false;
      }

      // Filter by guest capacity
      if (searchGuests && property.maxGuests < searchGuests) {
        return false;
      }

      // For date filtering, we would typically check availability
      // For now, we'll just return properties that match location and guests
      return true;
    });
  };

  useEffect(() => {
    const filtered = filterPropertiesBySearch(mockProperties);
    setFilteredProperties(filtered);
  }, [searchLocation, searchCheckIn, searchCheckOut, searchGuests]);

  useEffect(() => {
    if (activeCategory === 'all') {
      const filtered = filterPropertiesBySearch(mockProperties);
      setFilteredProperties(filtered);
    } else {
      const categoryFiltered = mockProperties.filter(property => property.category === activeCategory);
      const searchFiltered = filterPropertiesBySearch(categoryFiltered);
      setFilteredProperties(searchFiltered);
    }
  }, [activeCategory, searchLocation, searchCheckIn, searchCheckOut, searchGuests]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const clearSearch = () => {
    setSearchParams({});
    setActiveCategory('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Main Content */}
      <main className="pt-20">
        <HeroSearchSection />
        
        {/* Search Results Header */}
        {hasSearchParams && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-poppins font-semibold text-text-primary mb-2">
                    Search Results
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                    {searchLocation && (
                      <span className="flex items-center">
                        <Icon name="MapPin" size={14} className="mr-1" />
                        {searchLocation}
                      </span>
                    )}
                    {searchCheckIn && searchCheckOut && (
                      <span className="flex items-center">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        {new Date(searchCheckIn).toLocaleDateString()} - {new Date(searchCheckOut).toLocaleDateString()}
                      </span>
                    )}
                    {searchGuests > 1 && (
                      <span className="flex items-center">
                        <Icon name="Users" size={14} className="mr-1" />
                        {searchGuests} guests
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={clearSearch}
                  iconName="X"
                  iconPosition="left"
                  className="mt-2 sm:mt-0"
                >
                  Clear search
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Navigation Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Services Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate('/services')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Icon name="Wrench" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-poppins font-semibold text-text-primary mb-1">Services</h3>
                  <p className="text-sm font-inter text-text-secondary">Airport transfer, cleaning, concierge & more</p>
                </div>
              </div>
            </div>

            {/* Experiences Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate('/experiences')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Icon name="Star" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-poppins font-semibold text-text-primary mb-1">Experiences</h3>
                  <p className="text-sm font-inter text-text-secondary">Cooking classes, tours, adventures & activities</p>
                </div>
              </div>
            </div>

            {/* Host Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => navigate('/become-host')}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Icon name="UserPlus" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-poppins font-semibold text-text-primary mb-1">Become a Host</h3>
                  <p className="text-sm font-inter text-text-secondary">Share your space and earn money</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        
        {activeCategory === 'all' ? (
          <>
            {hasSearchParams ? (
              <PropertySection 
                title={`${filteredProperties.length} properties found`}
                properties={filteredProperties}
                showNavigation={false}
              />
            ) : (
              <>
                <PropertySection 
                  title="Popular homes in: Krakow"
                  properties={popularProperties}
                  showNavigation={true}
                />
                
                <PropertySection 
                  title="New on the platform"
                  properties={newProperties}
                  showNavigation={true}
                />
                
                <TrendingDestinations />
                
                <PropertySection 
                  title="Luxury accommodations"
                  properties={luxuryProperties}
                  showNavigation={true}
                />
              </>
            )}
            
            <HostPromotionBanner />
          </>
        ) : (
          <PropertySection 
            title={`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} properties ${hasSearchParams ? `(${filteredProperties.length} found)` : ''}`}
            properties={filteredProperties}
            showNavigation={false}
          />
        )}
      </main>

      {/* Footer - Only show when user is authenticated */}
      {isAuthenticated && (
        <footer className="bg-text-primary text-background py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-poppins font-semibold mb-4">StayEase</h3>
                <p className="text-sm font-inter text-background/80">
                  Find the perfect place to stay in Poland and around the world.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-inter font-semibold mb-4 uppercase tracking-wide">
                  Support
                </h4>
                <ul className="space-y-2 text-sm font-inter text-background/80">
                  <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Safety</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Cancellation</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-inter font-semibold mb-4 uppercase tracking-wide">
                  Community
                </h4>
                <ul className="space-y-2 text-sm font-inter text-background/80">
                  <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Forum</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Events</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Partners</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-inter font-semibold mb-4 uppercase tracking-wide">
                  Hosts
                </h4>
                <ul className="space-y-2 text-sm font-inter text-background/80">
                  <li><a href="#" className="hover:text-background transition-colors">Become a Host</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Resource Center</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Host Community</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Responsible Hosting</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-background/20 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm font-inter text-background/60">
                  © {new Date().getFullYear()} StayEase. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    Terms
                  </a>
                  <a href="#" className="text-background/60 hover:text-background transition-colors">
                    Sitemap
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Homepage;