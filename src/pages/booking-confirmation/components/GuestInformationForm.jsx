import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const GuestInformationForm = ({ onGuestInfoChange, guestInfo }) => {
  const [errors, setErrors] = useState({});
  const [showAllGuests, setShowAllGuests] = useState(false);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName': case'lastName':
        if (!value.trim()) {
          newErrors[name] = 'This field is required';
        } else if (value.trim().length < 2) {
          newErrors[name] = 'Minimum 2 characters';
        } else {
          delete newErrors[name];
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors[name] = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          newErrors[name] = 'Invalid email format';
        } else {
          delete newErrors[name];
        }
        break;
      case 'phone':
        const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
        if (!value.trim()) {
          newErrors[name] = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          newErrors[name] = 'Invalid phone number';
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    onGuestInfoChange(field, value);
    validateField(field, value);
  };

  const additionalGuests = Array.from({ length: Math.max(0, (guestInfo.totalGuests || 1) - 1) }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Main Guest Information */}
      <div>
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
          Main guest information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-inter font-medium text-text-primary mb-2">
              First name *
            </label>
            <Input
              type="text"
              placeholder="Enter first name"
              value={guestInfo.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-error' : ''}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs font-inter text-error flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-text-primary mb-2">
              Last name *
            </label>
            <Input
              type="text"
              placeholder="Enter last name"
              value={guestInfo.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-error' : ''}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs font-inter text-error flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-inter font-medium text-text-primary mb-2">
              Email address *
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={guestInfo.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-error' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-xs font-inter text-error flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-inter font-medium text-text-primary mb-2">
              Phone number *
            </label>
            <Input
              type="tel"
              placeholder="+1 234 567 8900"
              value={guestInfo.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'border-error' : ''}
            />
            {errors.phone && (
              <p className="mt-1 text-xs font-inter text-error flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {errors.phone}
              </p>
            )}
            <p className="mt-1 text-xs font-inter text-text-secondary">
              We need your phone number in case of booking issues
            </p>
          </div>
        </div>
      </div>

      {/* Additional Guests */}
      {additionalGuests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-poppins font-semibold text-text-primary">
              Additional guests ({additionalGuests.length})
            </h3>
            <Button
              variant="ghost"
              onClick={() => setShowAllGuests(!showAllGuests)}
              iconName={showAllGuests ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              className="text-sm text-primary"
            >
              {showAllGuests ? 'Hide' : 'Show'}
            </Button>
          </div>

          {showAllGuests && (
            <div className="space-y-4">
              {additionalGuests.map((guestIndex) => (
                <div key={guestIndex} className="p-4 bg-surface rounded-lg">
                  <h4 className="text-md font-inter font-medium text-text-primary mb-3">
                    Guest {guestIndex + 1}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                        First name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter first name"
                        value={guestInfo[`guest${guestIndex}FirstName`] || ''}
                        onChange={(e) => handleInputChange(`guest${guestIndex}FirstName`, e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-inter font-medium text-text-primary mb-2">
                        Last name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter last name"
                        value={guestInfo[`guest${guestIndex}LastName`] || ''}
                        onChange={(e) => handleInputChange(`guest${guestIndex}LastName`, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Special Requests */}
      <div>
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
          Special requests
        </h3>
        <div>
          <label className="block text-sm font-inter font-medium text-text-primary mb-2">
            Message for host (optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="4"
            placeholder="Share details about your stay, such as arrival time, special needs, or questions..."
            value={guestInfo.specialRequests || ''}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            maxLength="500"
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs font-inter text-text-secondary">
              Help the host prepare for your stay
            </p>
            <span className="text-xs font-inter text-text-secondary">
              {(guestInfo.specialRequests || '').length}/500
            </span>
          </div>
        </div>
      </div>

      {/* Travel Purpose */}
      <div>
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
          Travel purpose
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'leisure', label: 'Leisure', icon: 'Palmtree' },
            { value: 'business', label: 'Business', icon: 'Briefcase' },
            { value: 'family', label: 'Family', icon: 'Users' },
            { value: 'other', label: 'Other', icon: 'MoreHorizontal' }
          ].map((purpose) => (
            <label
              key={purpose.value}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                guestInfo.travelPurpose === purpose.value
                  ? 'border-primary bg-surface' :'border-border hover:border-primary hover:bg-surface'
              }`}
            >
              <input
                type="radio"
                name="travelPurpose"
                value={purpose.value}
                checked={guestInfo.travelPurpose === purpose.value}
                onChange={(e) => handleInputChange('travelPurpose', e.target.value)}
                className="sr-only"
              />
              <Icon name={purpose.icon} size={20} className="text-text-secondary mr-3" />
              <span className="text-sm font-inter font-medium text-text-primary">
                {purpose.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Contact Preferences */}
      <div>
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-4">
          Contact preferences
        </h3>
        <div className="space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={guestInfo.emailUpdates || false}
              onChange={(e) => handleInputChange('emailUpdates', e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <div>
              <span className="text-sm font-inter font-medium text-text-primary">
                Receive email updates
              </span>
              <p className="text-xs font-inter text-text-secondary">
                Booking information, reminders, and important updates
              </p>
            </div>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={guestInfo.smsUpdates || false}
              onChange={(e) => handleInputChange('smsUpdates', e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <div>
              <span className="text-sm font-inter font-medium text-text-primary">
                Receive SMS messages
              </span>
              <p className="text-xs font-inter text-text-secondary">
                Urgent notifications and booking reminders
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GuestInformationForm;