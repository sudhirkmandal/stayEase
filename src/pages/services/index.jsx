import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import NavigationHeader from '../../components/ui/NavigationHeader';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Airport Transfer",
      description: "Reliable airport pickup and drop-off service",
      price: "From $25",
      icon: "Car",
      features: ["24/7 Service", "Professional Drivers", "Fixed Pricing"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "House Cleaning",
      description: "Professional cleaning service for your accommodation",
      price: "From $40",
      icon: "Home",
      features: ["Deep Cleaning", "Eco-friendly", "Flexible Schedule"],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Concierge Service",
      description: "Personal assistance for all your travel needs",
      price: "From $15",
      icon: "UserCheck",
      features: ["Restaurant Booking", "Event Tickets", "Local Recommendations"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Laundry Service",
      description: "Quick and reliable laundry and dry cleaning",
      price: "From $20",
      icon: "Droplets",
      features: ["Same Day Service", "Pickup & Delivery", "Premium Care"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    }
  ];

  const additionalServices = [
    { name: "Pet Sitting", icon: "Heart", price: "From $30/day" },
    { name: "Grocery Delivery", icon: "ShoppingBag", price: "From $10" },
    { name: "Photography", icon: "Camera", price: "From $50" },
    { name: "Translation", icon: "Globe", price: "From $25/hour" },
    { name: "Childcare", icon: "Baby", price: "From $20/hour" },
    { name: "Tech Support", icon: "Monitor", price: "From $35" }
  ];

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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="w-full sm:w-80 px-4 py-3 rounded-lg text-gray-800 font-inter"
                  />
                  <Icon name="Search" size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors">
                  Find Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
            Popular Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
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
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-inter font-semibold hover:bg-primary-dark transition-colors">
                    Book Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
              More Services Available
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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

        {/* CTA Section */}
        <div className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Need a Custom Service?
            </h2>
            <p className="text-xl font-inter mb-8 opacity-90 max-w-2xl mx-auto">
              Can't find what you're looking for? Contact us and we'll help you arrange the perfect service for your needs.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 