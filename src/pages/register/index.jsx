import React, { useState } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationFooter from './components/RegistrationFooter';

const Register = () => {
  const [registrationMethod, setRegistrationMethod] = useState('form'); // 'form' or 'social'

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <RegistrationHeader />
          
          {/* Registration Method Toggle */}
          <div className="mb-8">
            <div className="flex bg-surface rounded-lg p-1">
              <button
                onClick={() => setRegistrationMethod('form')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-inter font-medium transition-all duration-200 ${
                  registrationMethod === 'form'
                    ? 'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Registration form
              </button>
              <button
                onClick={() => setRegistrationMethod('social')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-inter font-medium transition-all duration-200 ${
                  registrationMethod === 'social' ?'bg-background text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                Quick registration
              </button>
            </div>
          </div>

          {/* Registration Content */}
          <div className="bg-background">
            {registrationMethod === 'form' ? (
              <RegistrationForm />
            ) : (
              <SocialRegistration />
            )}
          </div>

          <RegistrationFooter />
        </div>
      </main>
    </div>
  );
};

export default Register;