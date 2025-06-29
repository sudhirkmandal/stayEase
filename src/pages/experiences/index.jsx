import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import NavigationHeader from '../../components/ui/NavigationHeader';

const Experiences = () => {
  const experiences = [
    {
      id: 1,
      title: "Cooking Class with Local Chef",
      location: "Krakow, Poland",
      price: "$45",
      duration: "3 hours",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      category: "Food & Drink"
    },
    {
      id: 2,
      title: "Historical Walking Tour",
      location: "Warsaw, Poland",
      price: "$25",
      duration: "2 hours",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
      category: "History & Culture"
    },
    {
      id: 3,
      title: "Mountain Hiking Adventure",
      location: "Zakopane, Poland",
      price: "$65",
      duration: "6 hours",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
      category: "Outdoor Activities"
    },
    {
      id: 4,
      title: "Wine Tasting Experience",
      location: "Wroclaw, Poland",
      price: "$35",
      duration: "2.5 hours",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
      category: "Food & Drink"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">
                Discover Amazing Experiences
              </h1>
              <p className="text-xl md:text-2xl font-inter mb-8 opacity-90">
                Book unique activities hosted by locals around the world
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full sm:w-80 px-4 py-3 rounded-lg text-gray-800 font-inter"
                  />
                  <Icon name="Search" size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors">
                  Search Experiences
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Food & Drink", icon: "Coffee", color: "bg-orange-100 text-orange-600" },
              { name: "History & Culture", icon: "Landmark", color: "bg-blue-100 text-blue-600" },
              { name: "Outdoor Activities", icon: "Mountain", color: "bg-green-100 text-green-600" },
              { name: "Art & Creativity", icon: "Palette", color: "bg-purple-100 text-purple-600" }
            ].map((category) => (
              <div key={category.name} className="text-center p-6 rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={category.icon} size={24} />
                </div>
                <h3 className="font-inter font-semibold text-text-primary">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Experiences */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-poppins font-bold text-text-primary mb-8 text-center">
            Featured Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-inter font-semibold text-text-primary">
                    {experience.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-poppins font-semibold text-text-primary mb-2 line-clamp-2">
                    {experience.title}
                  </h3>
                  <p className="text-text-secondary text-sm font-inter mb-2">
                    <Icon name="MapPin" size={14} className="inline mr-1" />
                    {experience.location}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Icon name="Star" size={14} className="text-yellow-400 mr-1" />
                      <span className="text-sm font-inter">{experience.rating}</span>
                    </div>
                    <span className="text-sm font-inter text-text-secondary">
                      <Icon name="Clock" size={14} className="inline mr-1" />
                      {experience.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-poppins font-bold text-primary text-lg">
                      {experience.price}
                    </span>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-inter font-semibold hover:bg-primary-dark transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-poppins font-bold text-text-primary mb-4">
              Ready to Host Your Own Experience?
            </h2>
            <p className="text-text-secondary font-inter mb-8 max-w-2xl mx-auto">
              Share your passion with travelers from around the world. Create unforgettable experiences and earn money doing what you love.
            </p>
            <Link
              to="/become-host"
              className="bg-primary text-white px-8 py-3 rounded-lg font-inter font-semibold hover:bg-primary-dark transition-colors inline-block"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences; 