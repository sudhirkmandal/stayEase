import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({ google: false, facebook: false });

  const handleSocialLogin = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));
    
    try {
      // Mock social registration process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      alert(`Successfully registered with ${provider === 'google' ? 'Google' : 'Facebook'}!`);
      navigate('/homepage');
    } catch (error) {
      alert(`Registration error with ${provider === 'google' ? 'Google' : 'Facebook'}. Please try again.`);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          loading={isLoading.google}
          disabled={isLoading.google || isLoading.facebook}
          fullWidth
          className="justify-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <span className="font-inter font-medium">
              {isLoading.google ? 'Connecting...' : 'Continue with Google'}
            </span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleSocialLogin('facebook')}
          loading={isLoading.facebook}
          disabled={isLoading.google || isLoading.facebook}
          fullWidth
          className="justify-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-[#1877F2] rounded-sm flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="font-inter font-medium">
              {isLoading.facebook ? 'Connecting...' : 'Continue with Facebook'}
            </span>
          </div>
        </Button>
      </div>

      <div className="mt-6 p-4 bg-surface rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div className="text-sm font-inter text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Data security</p>
            <p>
              When registering through social media, you only share basic information 
              (first name, last name, email). We don't have access to your passwords or private data.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs font-inter text-text-secondary">
          By registering, you accept our data usage terms in accordance with GDPR
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;