import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BookingModal from '../../components/ui/BookingModal';
import Button from '../../components/ui/Button';

const Experiences = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const experiences = [
    {
      id: 1,
      title: "Cooking Class with Local Chef",
      description: "Learn to cook authentic local dishes in a hands-on cooking class",
      price: "From $45",
      priceValue: 45,
      location: "Paris",
      category: "culinary",
      duration: "3 hours",
      groupSize: "Max 8 people",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      features: ["Hands-on cooking", "Recipe booklet", "Wine pairing", "Local ingredients"]
    },
    {
      id: 2,
      title: "Wine Tasting Tour",
      description: "Explore local vineyards and taste premium wines with expert guidance",
      price: "From $65",
      priceValue: 65,
      location: "Tuscany",
      category: "wine",
      duration: "4 hours",
      groupSize: "Max 12 people",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
      features: ["Vineyard tour", "Wine tasting", "Expert sommelier", "Transport included"]
    },
    {
      id: 3,
      title: "Photography Workshop",
      description: "Capture stunning landscapes with professional photography guidance",
      price: "From $35",
      priceValue: 35,
      location: "Santorini",
      category: "creative",
      duration: "2 hours",
      groupSize: "Max 6 people",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      features: ["Professional guide", "Equipment provided", "Editing tips", "Digital copies"]
    },
    {
      id: 4,
      title: "Hiking Adventure",
      description: "Explore scenic trails with experienced local guides",
      price: "From $25",
      priceValue: 25,
      location: "Swiss Alps",
      category: "outdoor",
      duration: "6 hours",
      groupSize: "Max 15 people",
      rating: 4.6,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
      features: ["Expert guide", "Safety equipment", "Lunch included", "Scenic viewpoints"]
    },
    {
      id: 5,
      title: "Art Workshop",
      description: "Create your own masterpiece in a local artist's studio",
      price: "From $40",
      priceValue: 40,
      location: "Florence",
      category: "creative",
      duration: "3 hours",
      groupSize: "Max 10 people",
      rating: 4.8,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      features: ["All materials included", "Expert instruction", "Take home artwork", "Studio access"]
    },
    {
      id: 6,
      title: "Sailing Experience",
      description: "Sail the crystal clear waters with experienced captains",
      price: "From $80",
      priceValue: 80,
      location: "Greek Islands",
      category: "water",
      duration: "5 hours",
      groupSize: "Max 8 people",
      rating: 4.9,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop",
      features: ["Professional captain", "Safety equipment", "Snorkeling gear", "Refreshments"]
    }
  ];

  const additionalExperiences = [
    { name: "Yoga Retreat", location: "Bali", category: "wellness", price: "From $120", icon: "Heart" },
    { name: "Pottery Class", location: "Kyoto", category: "creative", price: "From $30", icon: "Circle" },
    { name: "Dance Lesson", location: "Buenos Aires", category: "cultural", price: "From $25", icon: "Music" },
    { name: "Surfing Lesson", location: "Hawaii", category: "water", price: "From $60", icon: "Waves" }
  ];

  const categories = [
    { id: 'all', name: 'All Experiences', icon: 'Grid' },
    { id: 'culinary', name: 'Culinary', icon: 'Utensils' },
    { id: 'wine', name: 'Wine & Drinks', icon: 'Wine' },
    { id: 'creative', name: 'Creative Arts', icon: 'Palette' },
    { id: 'outdoor', name: 'Outdoor Adventure', icon: 'Mountain' },
    { id: 'water', name: 'Water Sports', icon: 'Waves' },
    { id: 'wellness', name: 'Wellness', icon: 'Heart' },
    { id: 'cultural', name: 'Cultural', icon: 'Globe' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'Paris', name: 'Paris' },
    { id: 'Tuscany', name: 'Tuscany' },
    { id: 'Santorini', name: 'Santorini' },
    { id: 'Swiss Alps', name: 'Swiss Alps' },
    { id: 'Florence', name: 'Florence' },
    { id: 'Greek Islands', name: 'Greek Islands' },
    { id: 'Bali', name: 'Bali' },
    { id: 'Kyoto', name: 'Kyoto' },
    { id: 'Buenos Aires', name: 'Buenos Aires' },
    { id: 'Hawaii', name: 'Hawaii' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'budget', name: 'Under $30', max: 30 },
    { id: 'mid', name: '$30 - $60', min: 30, max: 60 },
    { id: 'premium', name: 'Over $60', min: 60 }
  ];

  const handleBookExperience = (experience) => {
    setSelectedExperience(experience);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedExperience(null);
  };

  // Filter experiences based on search criteria
  const filteredExperiences = experiences.filter(experience => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;

    // Location filter
    const matchesLocation = selectedLocation === 'all' || experience.location === selectedLocation;

    // Price range filter
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === priceRange);
      if (range) {
        if (range.max && experience.priceValue > range.max) matchesPrice = false;
        if (range.min && experience.priceValue < range.min) matchesPrice = false;
      }
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setPriceRange('all');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedLocation !== 'all' || priceRange !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary to-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">
                Unforgettable Experiences
              </h1>
              <p className="text-xl md:text-2xl font-inter mb-8 opacity-90">
                Discover unique activities and create lasting memories with local hosts
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What experience are you looking for?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 font-inter pr-12"
                  />
                  <Icon name="Search" size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Filter Options */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 rounded-lg text-gray-800 font-inter bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-4 py-2 rounded-lg text-gray-800 font-inter bg-white"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="relative">
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="px-4 py-2 rounded-lg text-gray-800 font-inter bg-white"
                  >
                    {priceRanges.map(range => (
                      <option key={range.id} value={range.id}>
                        {range.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="bg-white text-primary hover:bg-gray-100"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Header */}
        {hasActiveFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-poppins font-semibold text-text-primary mb-2">
                    Search Results
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                    {searchTerm && (
                      <span className="flex items-center">
                        <Icon name="Search" size={14} className="mr-1" />
                        "{searchTerm}"
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="flex items-center">
                        <Icon name="Filter" size={14} className="mr-1" />
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                    {selectedLocation !== 'all' && (
                      <span className="flex items-center">
                        <Icon name="MapPin" size={14} className="mr-1" />
                        {locations.find(l => l.id === selectedLocation)?.name}
                      </span>
                    )}
                    {priceRange !== 'all' && (
                      <span className="flex items-center">
                        <Icon name="DollarSign" size={14} className="mr-1" />
                        {priceRanges.find(p => p.id === priceRange)?.name}
                      </span>
                    )}
                    <span className="text-primary font-medium">
                      {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'} found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Experiences */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
            {hasActiveFilters ? 'Search Results' : 'Popular Experiences'}
          </h2>
          
          {filteredExperiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredExperiences.map((experience) => (
                <div key={experience.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-inter font-semibold text-primary">
                      {experience.location}
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-inter font-semibold text-primary">
                      {experience.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-poppins font-semibold text-text-primary">
                        {experience.title}
                      </h3>
                      <div className="flex items-center">
                        <Icon name="Star" size={16} className="text-yellow-400 mr-1" />
                        <span className="text-sm font-inter text-text-secondary">
                          {experience.rating} ({experience.reviews})
                        </span>
                      </div>
                    </div>
                    <p className="text-text-secondary font-inter mb-4">
                      {experience.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center">
                        <Icon name="Users" size={14} className="mr-1" />
                        {experience.groupSize}
                      </div>
                    </div>
                    <div className="mb-4">
                      {experience.features.map((feature, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <Icon name="Check" size={16} className="text-green-500 mr-2" />
                          <span className="text-sm font-inter text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="w-full bg-primary text-white py-3 rounded-lg font-inter font-semibold hover:bg-primary-dark transition-colors"
                      onClick={() => handleBookExperience(experience)}
                    >
                      Book Experience
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Search" size={64} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-poppins font-semibold text-text-primary mb-2">
                No experiences found
              </h3>
              <p className="text-sm font-inter text-text-secondary mb-6">
                Try adjusting your search criteria or browse all experiences
              </p>
              <Button
                variant="primary"
                onClick={clearFilters}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Additional Experiences */}
        <div className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
              More Experiences Available
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {additionalExperiences.map((experience) => (
                <div key={experience.name} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={experience.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-inter font-semibold text-text-primary mb-2 text-sm">
                    {experience.name}
                  </h3>
                  <p className="text-text-secondary text-xs mb-2">{experience.location}</p>
                  <p className="text-primary font-poppins font-bold text-sm">
                    {experience.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-poppins font-bold text-text-primary mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Experience",
                description: "Browse our curated selection of unique experiences and activities",
                icon: "Search"
              },
              {
                step: "2",
                title: "Book & Confirm",
                description: "Select your preferred date and time, then confirm your booking",
                icon: "Calendar"
              },
              {
                step: "3",
                title: "Enjoy Your Adventure",
                description: "Meet your local host and create unforgettable memories",
                icon: "Smile"
              }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name={step.icon} size={32} color="white" />
                </div>
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-poppins font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-poppins font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary font-inter">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedExperience && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          item={selectedExperience}
          type="experience"
        />
      )}
    </div>
  );
};

export default Experiences; 