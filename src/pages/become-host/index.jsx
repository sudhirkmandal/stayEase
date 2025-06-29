import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import NavigationHeader from '../../components/ui/NavigationHeader';

const BecomeHost = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hostType, setHostType] = useState('');

  const steps = [
    { number: 1, title: "Choose what to host", description: "Decide what you want to offer" },
    { number: 2, title: "Tell us about your place", description: "Share details about your property" },
    { number: 3, title: "Set your price", description: "Choose how much to charge" },
    { number: 4, title: "Get ready for guests", description: "Prepare your listing" }
  ];

  const hostOptions = [
    {
      id: 'property',
      title: 'Host a Property',
      description: 'Rent out your home, apartment, or unique space',
      icon: 'Home',
      features: ['Flexible scheduling', 'Professional photography', '24/7 support'],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
    },
    {
      id: 'experience',
      title: 'Host an Experience',
      description: 'Share your passion and create unforgettable moments',
      icon: 'Star',
      features: ['Creative freedom', 'Local expertise', 'Global reach'],
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      id: 'service',
      title: 'Offer a Service',
      description: 'Provide professional services to travelers',
      icon: 'Settings',
      features: ['Verified professionals', 'Secure payments', 'Quality guarantee'],
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
    }
  ];

  const benefits = [
    {
      icon: 'DollarSign',
      title: 'Earn Money',
      description: 'Turn your space or skills into income'
    },
    {
      icon: 'Globe',
      title: 'Meet People',
      description: 'Connect with travelers from around the world'
    },
    {
      icon: 'Shield',
      title: 'Safe & Secure',
      description: 'Verified guests and secure payments'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Help whenever you need it'
    }
  ];

  const handleHostTypeSelect = (type) => {
    setHostType(type);
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">
                Become a Host
              </h1>
              <p className="text-xl md:text-2xl font-inter mb-8 opacity-90">
                Share your space, skills, or experiences and start earning today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors">
                  Start Hosting
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-inter font-semibold hover:bg-white hover:text-primary transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold ${
                  currentStep >= step.number 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <h3 className="font-inter font-semibold text-text-primary text-sm">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-xs">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Choose Host Type */}
        {currentStep === 1 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-poppins font-bold text-text-primary mb-4">
                What would you like to host?
              </h2>
              <p className="text-text-secondary font-inter text-lg">
                Choose the option that best fits what you want to offer
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hostOptions.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => handleHostTypeSelect(option.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary"
                >
                  <div className="relative">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md">
                      <Icon name={option.icon} size={24} className="text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-poppins font-semibold text-text-primary mb-3">
                      {option.title}
                    </h3>
                    <p className="text-text-secondary font-inter mb-4">
                      {option.description}
                    </p>
                    <div className="space-y-2">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Icon name="Check" size={16} className="text-green-500 mr-2" />
                          <span className="text-sm font-inter text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property Details (if property selected) */}
        {currentStep === 2 && hostType === 'property' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-poppins font-bold text-text-primary mb-4">
                Tell us about your place
              </h2>
              <p className="text-text-secondary font-inter text-lg">
                Help guests understand what makes your space special
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <form className="space-y-6">
                <div>
                  <label className="block font-inter font-semibold text-text-primary mb-2">
                    Property Type
                  </label>
                  <select className="w-full px-4 py-3 border border-border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Select property type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Condo</option>
                    <option>Unique space</option>
                  </select>
                </div>
                <div>
                  <label className="block font-inter font-semibold text-text-primary mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="w-full px-4 py-3 border border-border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter font-semibold text-text-primary mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      placeholder="Max guests"
                      className="w-full px-4 py-3 border border-border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-inter font-semibold text-text-primary mb-2">
                      Number of Bedrooms
                    </label>
                    <input
                      type="number"
                      placeholder="Bedrooms"
                      className="w-full px-4 py-3 border border-border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-inter font-semibold text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your space and what makes it special..."
                    className="w-full px-4 py-3 border border-border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-border rounded-lg font-inter font-semibold text-text-primary hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-inter font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-12 text-center">
              Why Host with StayEase?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name={benefit.icon} size={32} color="white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary font-inter">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-poppins font-bold text-text-primary mb-12 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anna K.",
                location: "Krakow, Poland",
                story: "I started hosting my apartment 2 years ago and now earn enough to travel the world!",
                earnings: "$2,400/month",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Marek S.",
                location: "Warsaw, Poland",
                story: "Hosting cooking classes has become my passion and main source of income.",
                earnings: "$1,800/month",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Ewa M.",
                location: "Gdansk, Poland",
                story: "My photography tours are now fully booked every weekend!",
                earnings: "$3,200/month",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((host) => (
              <div key={host.name} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={host.image}
                    alt={host.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-poppins font-semibold text-text-primary">{host.name}</h3>
                    <p className="text-text-secondary text-sm font-inter">{host.location}</p>
                  </div>
                </div>
                <p className="text-text-secondary font-inter mb-4">{host.story}</p>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-primary font-poppins font-bold text-center">{host.earnings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Ready to Start Hosting?
            </h2>
            <p className="text-xl font-inter mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of hosts who are already earning money and meeting amazing people from around the world.
            </p>
            <button 
              onClick={() => setCurrentStep(1)}
              className="bg-white text-primary px-8 py-3 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHost; 