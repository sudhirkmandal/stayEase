import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import HeroSearchSection from './components/HeroSearchSection';
import CategoryFilter from './components/CategoryFilter';
import PropertySection from './components/PropertySection';
import TrendingDestinations from './components/TrendingDestinations';
import HostPromotionBanner from './components/HostPromotionBanner';
import { useAuth } from '../../contexts/AuthContext';

const Homepage = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();
  const { isAuthenticated } = useAuth();

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
      isFavorite: false
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
      isFavorite: true
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
      isFavorite: false
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
      isFavorite: false
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
      isFavorite: true
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
      isFavorite: false
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
      isFavorite: false
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
      isFavorite: true
    }
  ];

  const popularProperties = mockProperties.slice(0, 6);
  const newProperties = mockProperties.filter(p => p.isNew);
  const luxuryProperties = mockProperties.filter(p => p.category === 'luxury' || p.price > 500);

  useEffect(() => {
    filterProperties(activeCategory);
  }, [activeCategory]);

  const filterProperties = (category) => {
    if (category === 'all') {
      setFilteredProperties(mockProperties);
    } else {
      setFilteredProperties(mockProperties.filter(property => property.category === category));
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Main Content */}
      <main className="pt-20">
        <HeroSearchSection />
        
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        
        {activeCategory === 'all' ? (
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
            
            <HostPromotionBanner />
          </>
        ) : (
          <PropertySection 
            title={`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} properties`}
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