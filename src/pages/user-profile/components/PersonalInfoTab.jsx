import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoTab = ({ user, onUpdateUser }) => {
  const [editingField, setEditingField] = useState(null);
  const [tempValues, setTempValues] = useState({});

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValues({ [field]: user[field] || '' });
  };

  const handleSave = (field) => {
    onUpdateUser({
      ...user,
      [field]: tempValues[field]
    });
    setEditingField(null);
    setTempValues({});
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValues({});
  };

  const personalFields = [
    {
      key: 'name',
      label: 'Full Name',
      icon: 'User',
      type: 'text',
      placeholder: 'Enter your full name'
    },
    {
      key: 'email',
      label: 'Email Address',
      icon: 'Mail',
      type: 'email',
      placeholder: 'Enter your email address'
    },
    {
      key: 'phone',
      label: 'Phone Number',
      icon: 'Phone',
      type: 'tel',
      placeholder: 'Enter your phone number'
    },
    {
      key: 'location',
      label: 'Location',
      icon: 'MapPin',
      type: 'text',
      placeholder: 'Enter your location'
    },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      icon: 'Calendar',
      type: 'date',
      placeholder: 'Select your date of birth'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Personal Information Fields */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          Personal Information
        </h3>
        
        <div className="space-y-6">
          {personalFields.map((field) => (
            <div key={field.key} className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3 flex-1">
                <Icon name={field.icon} size={20} className="text-text-secondary" />
                <div className="flex-1">
                  <label className="block text-sm font-inter font-medium text-text-primary mb-1">
                    {field.label}
                  </label>
                  {editingField === field.key ? (
                    <div className="flex items-center space-x-3">
                      <Input
                        type={field.type}
                        value={tempValues[field.key] || ''}
                        onChange={(e) => setTempValues({ ...tempValues, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="flex-1"
                      />
                      <div className="flex space-x-2">
                        <Button
                          variant="success"
                          onClick={() => handleSave(field.key)}
                          iconName="Check"
                          size="sm"
                        />
                        <Button
                          variant="ghost"
                          onClick={handleCancel}
                          iconName="X"
                          size="sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-inter text-text-primary">
                        {user[field.key] || (
                          <span className="text-text-secondary italic">Not provided</span>
                        )}
                      </span>
                      <Button
                        variant="ghost"
                        onClick={() => handleEdit(field.key)}
                        iconName="Edit"
                        size="sm"
                        className="ml-4"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          About Me
        </h3>
        
        {editingField === 'bio' ? (
          <div className="space-y-4">
            <textarea
              value={tempValues.bio || ''}
              onChange={(e) => setTempValues({ ...tempValues, bio: e.target.value })}
              placeholder="Tell us something about yourself..."
              rows={6}
              className="w-full p-3 border border-border-input rounded-md text-sm font-inter text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={() => handleSave('bio')}
                iconName="Check"
                iconPosition="left"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {user.bio ? (
              <div className="space-y-4">
                <p className="text-sm font-inter text-text-primary leading-relaxed">
                  {user.bio}
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleEdit('bio')}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit bio
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="text-sm font-inter text-text-secondary mb-4">
                  Add a bio to help other users get to know you better
                </p>
                <Button
                  variant="primary"
                  onClick={() => handleEdit('bio')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add bio
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          Account Information
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-text-secondary" />
              <div>
                <label className="block text-sm font-inter font-medium text-text-primary">
                  Member Since
                </label>
                <span className="text-sm font-inter text-text-secondary">
                  {user.joinDate || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-text-secondary" />
              <div>
                <label className="block text-sm font-inter font-medium text-text-primary">
                  Account Status
                </label>
                <span className="text-sm font-inter text-text-secondary">
                  {user.isVerified ? 'Verified' : 'Not verified'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="User" size={20} className="text-text-secondary" />
              <div>
                <label className="block text-sm font-inter font-medium text-text-primary">
                  User ID
                </label>
                <span className="text-sm font-inter text-text-secondary">
                  {user.id || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;