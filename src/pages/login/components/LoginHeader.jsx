import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/homepage" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Home" size={20} color="white" />
                </div>
                <span className="text-xl font-poppins font-semibold text-primary">
                  StayEase
                </span>
              </div>
            </Link>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-md border border-border hover:bg-surface transition-colors duration-200 cursor-pointer">
              <Icon name="Globe" size={16} className="text-text-secondary" />
              <span className="text-sm font-inter text-text-primary">EN</span>
              <Icon name="ChevronDown" size={14} className="text-text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;