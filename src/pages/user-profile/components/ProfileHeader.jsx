import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileHeader = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({
          ...prev,
          avatar: reader.result
        }));
        setImageLoading(false);
      };
      reader.onerror = () => {
        setImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const completionPercentage = () => {
    const fields = ['name', 'email', 'phone', 'bio', 'avatar'];
    const completedFields = fields.filter(field => user[field] && user[field].trim() !== '');
    return Math.round((completedFields.length / fields.length) * 100);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 mb-6">
      {/* Profile Completion Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-inter font-medium text-text-primary">
            Profile completion
          </span>
          <span className="text-sm font-inter font-medium text-primary">
            {completionPercentage()}%
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage()}%` }}
          />
        </div>
        {completionPercentage() < 100 && (
          <p className="text-xs font-inter text-text-secondary mt-2">
            Complete your profile to increase trust with other users
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-surface border-2 border-border cursor-pointer" onClick={handleImageClick}>
              {imageLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (isEditing ? editedUser.avatar : user.avatar) ? (
                <Image
                  src={isEditing ? editedUser.avatar : user.avatar}
                  alt={`${user.name} profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-text-secondary" />
                </div>
              )}
            </div>
            <button 
              className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-background transition-colors duration-200 ${
                isEditing 
                  ? 'bg-accent hover:bg-primary cursor-pointer' 
                  : 'bg-primary hover:bg-accent'
              }`}
              onClick={handleImageClick}
            >
              <Icon name="Camera" size={16} color="white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {isEditing && (
            <p className="text-xs font-inter text-text-secondary mt-2 text-center">
              Click to change photo
            </p>
          )}
        </div>

        {/* Profile Information */}
        <div className="flex-1">
          {!isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-poppins font-semibold text-text-primary">
                    {user.name || 'No name provided'}
                  </h1>
                  <p className="text-sm font-inter text-text-secondary">
                    Joined {user.joinDate || 'Unknown date'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  iconName="Edit"
                  iconPosition="left"
                  className="hidden md:flex"
                >
                  Edit profile
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-text-secondary" />
                  <span className="text-sm font-inter text-text-primary">
                    {user.email || 'No email provided'}
                  </span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-text-secondary" />
                    <span className="text-sm font-inter text-text-primary">
                      {user.phone}
                    </span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-text-secondary" />
                    <span className="text-sm font-inter text-text-primary">
                      {user.location}
                    </span>
                  </div>
                )}
              </div>

              {user.bio && (
                <div className="mt-4">
                  <p className="text-sm font-inter text-text-primary leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              )}

              <div className="md:hidden mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  iconName="Edit"
                  iconPosition="left"
                  fullWidth
                >
                  Edit profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                    FULL NAME
                  </label>
                  <Input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                    PHONE
                  </label>
                  <Input
                    type="tel"
                    value={editedUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                  LOCATION
                </label>
                <Input
                  type="text"
                  value={editedUser.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter your location"
                />
              </div>

              <div>
                <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                  ABOUT ME
                </label>
                <textarea
                  value={editedUser.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us something about yourself..."
                  rows={4}
                  className="w-full p-3 border border-border-input rounded-md text-sm font-inter text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  iconName="Check"
                  iconPosition="left"
                  className="sm:flex-1"
                >
                  Save changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  iconName="X"
                  iconPosition="left"
                  className="sm:flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;