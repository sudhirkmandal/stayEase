import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BookingModal from '../../components/ui/BookingModal';
import Button from '../../components/ui/Button';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const services = [
    {
      id: 1,
      title: "Airport Transfer",
      description: "Reliable airport pickup and drop-off service",
      price: "From $25",
      priceValue: 25,
      icon: "Car",
      category: "transportation",
      features: ["24/7 Service", "Professional Drivers", "Fixed Pricing"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "House Cleaning",
      description: "Professional cleaning service for your accommodation",
      price: "From $40",
      priceValue: 40,
      icon: "Home",
      category: "cleaning",
      features: ["Deep Cleaning", "Eco-friendly", "Flexible Schedule"],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Concierge Service",
      description: "Personal assistance for all your travel needs",
      price: "From $15",
      priceValue: 15,
      icon: "UserCheck",
      category: "assistance",
      features: ["Restaurant Booking", "Event Tickets", "Local Recommendations"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Laundry Service",
      description: "Quick and reliable laundry and dry cleaning",
      price: "From $20",
      priceValue: 20,
      icon: "Droplets",
      category: "cleaning",
      features: ["Same Day Service", "Pickup & Delivery", "Premium Care"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Pet Sitting",
      description: "Professional pet care while you're away",
      price: "From $30",
      priceValue: 30,
      icon: "Heart",
      category: "petcare",
      features: ["24/7 Care", "Daily Updates", "Veterinary Access"],
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Grocery Delivery",
      description: "Fresh groceries delivered to your door",
      price: "From $10",
      priceValue: 10,
      icon: "ShoppingBag",
      category: "delivery",
      features: ["Fresh Products", "Same Day Delivery", "Contactless"],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
    }
  ];

  const additionalServices = [
    { name: "Photography", icon: "Camera", price: "From $50", category: "creative" },
    { name: "Translation", icon: "Globe", price: "From $25/hour", category: "assistance" },
    { name: "Childcare", icon: "Baby", price: "From $20/hour", category: "care" },
    { name: "Tech Support", icon: "Monitor", price: "From $35", category: "technical" }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: 'Grid' },
    { id: 'transportation', name: 'Transportation', icon: 'Car' },
    { id: 'cleaning', name: 'Cleaning', icon: 'Home' },
    { id: 'assistance', name: 'Assistance', icon: 'UserCheck' },
    { id: 'delivery', name: 'Delivery', icon: 'ShoppingBag' },
    { id: 'petcare', name: 'Pet Care', icon: 'Heart' },
    { id: 'creative', name: 'Creative', icon: 'Camera' },
    { id: 'care', name: 'Care', icon: 'Baby' },
    { id: 'technical', name: 'Technical', icon: 'Monitor' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'budget', name: 'Under $20', max: 20 },
    { id: 'mid', name: '$20 - $40', min: 20, max: 40 },
    { id: 'premium', name: 'Over $40', min: 40 }
  ];

  const handleBookService = (service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  // Filter services based on search criteria
  const filteredServices = services.filter(service => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;

    // Price range filter
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === priceRange);
      if (range) {
        if (range.max && service.priceValue > range.max) matchesPrice = false;
        if (range.min && service.priceValue < range.min) matchesPrice = false;
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || priceRange !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-secondary to-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">
                Premium Travel Services
              </h1>
              <p className="text-xl md:text-2xl font-inter mb-8 opacity-90">
                Enhance your stay with our curated selection of professional services
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What service do you need?"
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
                    {priceRange !== 'all' && (
                      <span className="flex items-center">
                        <Icon name="DollarSign" size={14} className="mr-1" />
                        {priceRanges.find(p => p.id === priceRange)?.name}
                      </span>
                    )}
                    <span className="text-primary font-medium">
                      {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
            {hasActiveFilters ? 'Search Results' : 'Popular Services'}
          </h2>
          
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredServices.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-md">
                      <Icon name={service.icon} size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-poppins font-semibold text-text-primary">
                        {service.title}
                      </h3>
                      <span className="font-poppins font-bold text-primary text-lg">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-text-secondary font-inter mb-4">
                      {service.description}
                    </p>
                    <div className="mb-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <Icon name="Check" size={16} className="text-green-500 mr-2" />
                          <span className="text-sm font-inter text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="w-full bg-primary text-white py-3 rounded-lg font-inter font-semibold hover:bg-primary-dark transition-colors"
                      onClick={() => handleBookService(service)}
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Search" size={64} className="text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-poppins font-semibold text-text-primary mb-2">
                No services found
              </h3>
              <p className="text-sm font-inter text-text-secondary mb-6">
                Try adjusting your search criteria or browse all services
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

        {/* Additional Services */}
        <div className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
              More Services Available
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {additionalServices.map((service) => (
                <div key={service.name} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-inter font-semibold text-text-primary mb-2 text-sm">
                    {service.name}
                  </h3>
                  <p className="text-primary font-poppins font-bold text-sm">
                    {service.price}
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
                title: "Choose Your Service",
                description: "Browse our selection of professional services and select what you need",
                icon: "Search"
              },
              {
                step: "2",
                title: "Book & Confirm",
                description: "Select your preferred time and confirm your booking instantly",
                icon: "Calendar"
              },
              {
                step: "3",
                title: "Enjoy Quality Service",
                description: "Our verified professionals will deliver exceptional service to your door",
                icon: "CheckCircle"
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

      {selectedService && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          item={selectedService}
          type="service"
        />
      )}
    </div>
  );
};

export default Services; 