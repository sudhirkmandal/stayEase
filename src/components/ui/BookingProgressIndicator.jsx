import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BookingProgressIndicator = () => {
  const location = useLocation();

  const steps = [
    {
      id: 1,
      label: 'Szczegóły nieruchomości',
      path: '/property-detail',
      icon: 'Home',
    },
    {
      id: 2,
      label: 'Potwierdzenie rezerwacji',
      path: '/booking-confirmation',
      icon: 'CheckCircle',
    },
  ];

  const getCurrentStep = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/property-detail/')) return 1;
    if (currentPath === '/booking-confirmation') return 2;
    return 0;
  };

  const currentStep = getCurrentStep();

  // Only show progress indicator on booking flow pages
  if (!location.pathname.startsWith('/property-detail/') && location.pathname !== '/booking-confirmation') {
    return null;
  }

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Progress Indicator */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const isUpcoming = step.id > currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-success text-success-foreground'
                        : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-text-secondary border-2 border-border'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step.icon} size={20} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-inter font-medium ${
                        isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'
                      }`}
                    >
                      Krok {step.id}
                    </span>
                    <span
                      className={`text-xs font-inter ${
                        isActive ? 'text-text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="ml-8 mr-8">
                    <div
                      className={`w-16 h-0.5 transition-all duration-300 ${
                        step.id < currentStep ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Indicator */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 2
                    ? 'bg-success text-success-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {currentStep === 2 ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={steps[currentStep - 1]?.icon || 'Home'} size={16} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-inter font-medium text-primary">
                  Krok {currentStep} z {steps.length}
                </span>
                <span className="text-xs font-inter text-text-secondary">
                  {steps[currentStep - 1]?.label}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step.id === currentStep
                        ? 'bg-primary'
                        : step.id < currentStep
                        ? 'bg-success' :'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mt-4 pt-4 border-t border-border">
          <nav className="flex items-center space-x-2 text-sm font-inter">
            <a
              href="/homepage"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Strona główna
            </a>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            {currentStep === 1 && (
              <span className="text-text-primary font-medium">Szczegóły nieruchomości</span>
            )}
            {currentStep === 2 && (
              <>
                <a
                  href={location.pathname.startsWith('/property-detail/') ? location.pathname : '/property-detail/1'}
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  Szczegóły nieruchomości
                </a>
                <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                <span className="text-text-primary font-medium">Potwierdzenie rezerwacji</span>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;