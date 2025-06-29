import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HostPromotionBanner = () => {
  const navigate = useNavigate();

  const handleBecomeHost = () => {
    navigate('/user-profile');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-accent to-accent/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-accent-foreground mb-6">
              Become a host and earn from your property
            </h2>
            <p className="text-lg font-inter text-accent-foreground/90 mb-8 max-w-lg">
              Join thousands of hosts who are already earning by sharing their homes with travelers from around the world. It's simple, safe, and profitable.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent-foreground rounded-full flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">✓</span>
                </div>
                <span className="text-accent-foreground font-inter">
                  Free listing creation
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent-foreground rounded-full flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">✓</span>
                </div>
                <span className="text-accent-foreground font-inter">
                  24/7 host support
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent-foreground rounded-full flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">✓</span>
                </div>
                <span className="text-accent-foreground font-inter">
                  Insurance up to $1M
                </span>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={handleBecomeHost}
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-accent-foreground text-accent hover:bg-accent-foreground/90"
            >
              Start today
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
                alt="Happy host in their home"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-primary">$2,500</div>
                <div className="text-sm font-inter text-text-secondary">average monthly earnings</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-background rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-success">4.8★</div>
                <div className="text-sm font-inter text-text-secondary">average rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostPromotionBanner;