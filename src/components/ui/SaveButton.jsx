import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const SaveButton = ({ property, className = '', size = 'md' }) => {
  const { isAuthenticated, user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  // Check if property is saved on component mount
  useEffect(() => {
    if (isAuthenticated && user && property) {
      const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      const isPropertySaved = savedProperties.some(
        saved => saved.id === property.id && saved.userId === user.id
      );
      setIsSaved(isPropertySaved);
    }
  }, [isAuthenticated, user, property]);

  const handleSaveToggle = () => {
    if (!isAuthenticated || !user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    try {
      const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      
      if (isSaved) {
        // Remove from saved
        const updatedSaved = savedProperties.filter(
          saved => !(saved.id === property.id && saved.userId === user.id)
        );
        localStorage.setItem('savedProperties', JSON.stringify(updatedSaved));
        setIsSaved(false);
      } else {
        // Add to saved
        const propertyToSave = {
          ...property,
          userId: user.id,
          savedDate: new Date().toISOString()
        };
        const updatedSaved = [...savedProperties, propertyToSave];
        localStorage.setItem('savedProperties', JSON.stringify(updatedSaved));
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      onClick={handleSaveToggle}
      className={`${sizeClasses[size]} bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all duration-200 ${className}`}
      title={isSaved ? 'Remove from saved' : 'Save property'}
    >
      <Icon 
        name="Heart" 
        size={iconSizes[size]} 
        className={`transition-all duration-200 ${
          isSaved 
            ? 'text-primary fill-current' 
            : 'text-text-primary hover:text-primary'
        }`} 
      />
    </button>
  );
};

export default SaveButton; 