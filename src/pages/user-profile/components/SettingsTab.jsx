import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SettingsTab = ({ user, onUpdateUser }) => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false,
      bookingUpdates: true,
      hostMessages: true,
      priceAlerts: false
    },
    privacy: {
      profileVisibility: 'public',
      showReviews: true,
      showWishlist: false,
      allowMessages: true
    },
    preferences: {
      language: 'en',
      currency: 'USD',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Mock password change
    alert('Password changed successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsChangingPassword(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      alert('Account has been marked for deletion. You will receive a confirmation email.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          Account Security
        </h3>
        
        {!isChangingPassword ? (
          <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">Password</p>
              <p className="text-xs font-inter text-text-secondary">
                Last changed: January 15, 2024
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsChangingPassword(true)}
              iconName="Key"
              iconPosition="left"
            >
              Change password
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                CURRENT PASSWORD
              </label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                NEW PASSWORD
              </label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-xs font-inter font-medium text-text-primary mb-2">
                CONFIRM NEW PASSWORD
              </label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handlePasswordChange}
                iconName="Check"
                iconPosition="left"
              >
                Save password
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsChangingPassword(false)}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          Notifications
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Email notifications
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Receive notifications via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                SMS notifications
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Receive notifications via SMS
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Push notifications
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Receive push notifications in browser
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Marketing emails
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Receive promotional offers and updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.marketing}
                onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Booking updates
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Get notified about booking changes
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.bookingUpdates}
                onChange={(e) => handleNotificationChange('bookingUpdates', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          Privacy
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Profile visibility
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Control who can see your profile
              </p>
            </div>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="text-sm font-inter text-text-primary bg-background border border-border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="public">Public</option>
              <option value="friends">Friends only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Show reviews
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Allow others to see your reviews
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showReviews}
                onChange={(e) => handlePrivacyChange('showReviews', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Allow messages
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Let hosts and guests message you
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.allowMessages}
                onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Language
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Choose your preferred language
              </p>
            </div>
            <select
              value={settings.preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="text-sm font-inter text-text-primary bg-background border border-border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Currency
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Choose your preferred currency
              </p>
            </div>
            <select
              value={settings.preferences.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              className="text-sm font-inter text-text-primary bg-background border border-border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Timezone
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Set your local timezone
              </p>
            </div>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              className="text-sm font-inter text-text-primary bg-background border border-border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h3 className="text-lg font-poppins font-semibold text-text-primary mb-6">
          Danger Zone
        </h3>
        
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-inter font-medium text-text-primary">
                Delete Account
              </p>
              <p className="text-xs font-inter text-text-secondary">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="error"
              onClick={handleDeleteAccount}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;