import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="mb-6">
        <Link to="/homepage" className="inline-flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Icon name="Home" size={20} color="white" />
          </div>
          <span className="text-xl font-poppins font-semibold text-primary">
            StayEase
          </span>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-poppins font-semibold text-text-primary mb-2">
          Welcome to StayEase
        </h1>
        <p className="text-lg font-inter text-text-secondary">
          Create an account and start discovering amazing places
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4 text-sm font-inter text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure</span>
        </div>
        <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-accent" />
          <span>Fast</span>
        </div>
        <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={16} className="text-primary" />
          <span>Free</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;