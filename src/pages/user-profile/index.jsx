import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import ProfileHeader from './components/ProfileHeader';
import TabNavigation from './components/TabNavigation';
import PersonalInfoTab from './components/PersonalInfoTab';
import BookingsTab from './components/BookingsTab';
import SavedPropertiesTab from './components/SavedPropertiesTab';
import SettingsTab from './components/SettingsTab';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [profileUser, setProfileUser] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Set initial active tab from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['personal', 'bookings', 'saved', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Initialize profile user with authenticated user data
  useEffect(() => {
    if (isAuthenticated && user) {
      setProfileUser(user);
    }
  }, [isAuthenticated, user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Update URL without page reload
    const newUrl = `/user-profile?tab=${tab}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleUpdateUser = (updatedUser) => {
    setProfileUser(updatedUser);
    updateUser(updatedUser);
  };

  const renderTabContent = () => {
    if (!profileUser) return null;
    
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab 
            user={profileUser} 
            onUpdateUser={handleUpdateUser} 
          />
        );
      case 'bookings':
        return <BookingsTab />;
      case 'saved':
        return <SavedPropertiesTab />;
      case 'settings':
        return (
          <SettingsTab 
            user={profileUser} 
            onUpdateUser={handleUpdateUser} 
          />
        );
      default:
        return (
          <PersonalInfoTab 
            user={profileUser} 
            onUpdateUser={handleUpdateUser} 
          />
        );
    }
  };

  // Show loading while checking authentication or loading user data
  if (!isAuthenticated || !profileUser) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">
            {!isAuthenticated ? 'Redirecting to login...' : 'Loading profile...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <NavigationHeader />
      <BookingProgressIndicator />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-poppins font-bold text-text-primary mb-2">
              My Profile
            </h1>
            <p className="text-sm font-inter text-text-secondary">
              Manage your personal information, bookings, and account settings
            </p>
          </div>

          {/* Profile Header */}
          <ProfileHeader 
            user={profileUser} 
            onUpdateUser={handleUpdateUser} 
          />

          {/* Tab Navigation */}
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <h3 className="text-lg font-poppins font-semibold mb-4">StayEase</h3>
              </div>
              <p className="text-sm font-inter text-text-secondary">
                Find the perfect place to stay in every corner of the world.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-inter font-semibold text-text-primary mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Cancellation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-inter font-semibold text-text-primary mb-4">
                Community
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Referrals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Become a Host
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-inter font-semibold text-text-primary mb-4">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                    Investors
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <p className="text-sm font-inter text-text-secondary">
                © {new Date().getFullYear()} StayEase. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                  Privacy
                </a>
                <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                  Terms
                </a>
                <a href="#" className="text-sm font-inter text-text-secondary hover:text-text-primary transition-colors duration-200">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfile;