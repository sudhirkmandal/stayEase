import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: 'Home' },
    { id: 'apartment', label: 'Apartments', icon: 'Building' },
    { id: 'house', label: 'Houses', icon: 'Home' },
    { id: 'villa', label: 'Villas', icon: 'Castle' },
    { id: 'cabin', label: 'Cabins', icon: 'TreePine' },
    { id: 'unique', label: 'Unique', icon: 'Sparkles' },
    { id: 'luxury', label: 'Luxury', icon: 'Crown' },
    { id: 'beachfront', label: 'Beachfront', icon: 'Waves' },
    { id: 'mountain', label: 'Mountains', icon: 'Mountain' },
    { id: 'city', label: 'City', icon: 'Building2' },
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <section className="py-6 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'primary' : 'ghost'}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-2 px-4 py-3 min-w-[80px] ${
                activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-surface'
              }`}
            >
              <Icon 
                name={category.icon} 
                size={20} 
                className={activeCategory === category.id ? 'text-primary-foreground' : 'text-text-secondary'}
              />
              <span className={`text-xs font-inter font-medium ${
                activeCategory === category.id ? 'text-primary-foreground' : 'text-text-primary'
              }`}>
                {category.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;