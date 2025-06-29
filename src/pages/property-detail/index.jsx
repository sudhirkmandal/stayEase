import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import PropertyImageGallery from './components/PropertyImageGallery';
import PropertyInfo from './components/PropertyInfo';
import BookingWidget from './components/BookingWidget';
import ReviewsSection from './components/ReviewsSection';
import LocationMap from './components/LocationMap';
import MobileBookingBar from './components/MobileBookingBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SaveButton from '../../components/ui/SaveButton';

const PropertyDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock properties database - this would come from an API in a real app
  const mockPropertiesDatabase = {
    1: {
      id: 1,
      title: "Cozy apartment in the heart of Krakow with Wawel Castle view",
      location: "Krakow, Lesser Poland",
      pricePerNight: 280,
      rating: 4.9,
      reviewCount: 127,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      propertyType: "Entire apartment",
      cleaningFee: 50,
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/1571624436279-b272aff752b5?w=800&h=600&fit=crop"
      ],
      description: `Discover the charm of Krakow in this cozy apartment located in the heart of the city with stunning views of Wawel Castle. The apartment has been recently renovated and equipped with modern amenities while maintaining its historical character.\n\nThe apartment is just a few minutes walk from the Main Market Square and main tourist attractions. Perfect place for couples or small groups wanting to experience the culture and history of Krakow.\n\nThe apartment offers comfortable accommodation with a fully equipped kitchen, comfortable bedroom, and spacious living room with access to fast Wi-Fi internet.`,
      amenities: [
        { name: "Wi-Fi", icon: "Wifi" },
        { name: "Kitchen", icon: "ChefHat" },
        { name: "Washer", icon: "Shirt" },
        { name: "Air conditioning", icon: "Wind" },
        { name: "Heating", icon: "Thermometer" },
        { name: "TV", icon: "Tv" },
        { name: "Iron", icon: "Zap" },
        { name: "Hair dryer", icon: "Wind" },
        { name: "Shampoo", icon: "Droplets" },
        { name: "Towels", icon: "Bath" },
        { name: "Bedding", icon: "Bed" },
        { name: "Hangers", icon: "Shirt" }
      ],
      houseRules: [
        "No smoking",
        "No pets allowed", 
        "No parties or events",
        "Quiet hours from 10:00 PM to 8:00 AM",
        "Maximum 4 guests"
      ],
      host: {
        name: "Anna Smith",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        joinedYear: "2019",
        isSuperhost: true,
        responseTime: "within an hour"
      },
      locationDescription: "Excellent location in the heart of Krakow's Old Town. Close to the Main Market Square, restaurants, cafes, and main tourist attractions."
    },
    2: {
      id: 2,
      title: "Luxury villa with pool in Zakopane",
      location: "Zakopane, Lesser Poland",
      pricePerNight: 650,
      rating: 4.8,
      reviewCount: 89,
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3,
      propertyType: "Entire villa",
      cleaningFee: 120,
      images: [
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
      ],
      description: `Experience luxury in the heart of the Tatra Mountains. This stunning villa offers breathtaking mountain views, a private pool, and all the amenities you need for a perfect mountain getaway.\n\nThe villa features spacious rooms, a fully equipped kitchen, and a beautiful terrace with panoramic views. Perfect for families or groups looking for a premium mountain experience.\n\nLocated just minutes from Zakopane's main attractions, ski slopes, and hiking trails.`,
      amenities: [
        { name: "Wi-Fi", icon: "Wifi" },
        { name: "Kitchen", icon: "ChefHat" },
        { name: "Washer", icon: "Shirt" },
        { name: "Air conditioning", icon: "Wind" },
        { name: "Heating", icon: "Thermometer" },
        { name: "TV", icon: "Tv" },
        { name: "Pool", icon: "Droplets" },
        { name: "Garden", icon: "Tree" },
        { name: "Parking", icon: "Car" },
        { name: "Fireplace", icon: "Flame" },
        { name: "BBQ", icon: "ChefHat" },
        { name: "Mountain view", icon: "Mountain" }
      ],
      houseRules: [
        "No smoking",
        "Pets allowed with prior approval",
        "No parties or events",
        "Quiet hours from 11:00 PM to 7:00 AM",
        "Maximum 8 guests"
      ],
      host: {
        name: "Marek Kowalski",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        joinedYear: "2018",
        isSuperhost: true,
        responseTime: "within 2 hours"
      },
      locationDescription: "Prime location in Zakopane with easy access to ski slopes, hiking trails, and the town center. Stunning mountain views from every window."
    },
    3: {
      id: 3,
      title: "Modern house by the sea in Gdansk",
      location: "Gdansk, Pomerania",
      pricePerNight: 420,
      rating: 4.7,
      reviewCount: 156,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: "Entire house",
      cleaningFee: 80,
      images: [
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
      ],
      description: `Beautiful modern house located just steps from the Baltic Sea. This spacious property offers stunning sea views, a private garden, and all modern amenities for a comfortable stay.\n\nThe house features three comfortable bedrooms, two bathrooms, a fully equipped kitchen, and a large living room with floor-to-ceiling windows offering panoramic sea views.\n\nPerfect for families or groups looking to enjoy the beautiful Polish coast.`,
      amenities: [
        { name: "Wi-Fi", icon: "Wifi" },
        { name: "Kitchen", icon: "ChefHat" },
        { name: "Washer", icon: "Shirt" },
        { name: "Air conditioning", icon: "Wind" },
        { name: "Heating", icon: "Thermometer" },
        { name: "TV", icon: "Tv" },
        { name: "Garden", icon: "Tree" },
        { name: "Parking", icon: "Car" },
        { name: "Beach access", icon: "Waves" },
        { name: "BBQ", icon: "ChefHat" },
        { name: "Sea view", icon: "Eye" },
        { name: "Bicycle storage", icon: "Bike" }
      ],
      houseRules: [
        "No smoking",
        "Pets allowed with prior approval",
        "No parties or events",
        "Quiet hours from 10:00 PM to 8:00 AM",
        "Maximum 6 guests"
      ],
      host: {
        name: "Katarzyna Nowak",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        joinedYear: "2020",
        isSuperhost: false,
        responseTime: "within 3 hours"
      },
      locationDescription: "Prime beachfront location in Gdansk with direct access to the Baltic Sea. Close to restaurants, shops, and local attractions."
    },
    4: {
      id: 4,
      title: "Stylish loft in the center of Warsaw",
      location: "Warsaw, Masovia",
      pricePerNight: 380,
      rating: 4.6,
      reviewCount: 203,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: "Entire loft",
      cleaningFee: 60,
      images: [
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
      ],
      description: `Modern and stylish loft apartment in the heart of Warsaw's business district. This beautifully designed space offers a perfect blend of comfort and style for business travelers or couples.\n\nThe loft features high ceilings, large windows, and contemporary furnishings. The open-plan design creates a spacious feel while maintaining all the comforts of home.\n\nLocated in a vibrant neighborhood with easy access to public transportation, restaurants, and shopping.`,
      amenities: [
        { name: "Wi-Fi", icon: "Wifi" },
        { name: "Kitchen", icon: "ChefHat" },
        { name: "Washer", icon: "Shirt" },
        { name: "Air conditioning", icon: "Wind" },
        { name: "Heating", icon: "Thermometer" },
        { name: "TV", icon: "Tv" },
        { name: "Iron", icon: "Zap" },
        { name: "Hair dryer", icon: "Wind" },
        { name: "Shampoo", icon: "Droplets" },
        { name: "Towels", icon: "Bath" },
        { name: "Bedding", icon: "Bed" },
        { name: "Work desk", icon: "Monitor" }
      ],
      houseRules: [
        "No smoking",
        "No pets allowed",
        "No parties or events",
        "Quiet hours from 10:00 PM to 8:00 AM",
        "Maximum 3 guests"
      ],
      host: {
        name: "Piotr Wiśniewski",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        joinedYear: "2021",
        isSuperhost: false,
        responseTime: "within an hour"
      },
      locationDescription: "Central location in Warsaw's business district with easy access to public transportation, restaurants, and shopping centers."
    },
    5: {
      id: 5,
      title: "Romantic cabin in the mountains",
      location: "Karpacz, Lower Silesia",
      pricePerNight: 320,
      rating: 4.9,
      reviewCount: 94,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      propertyType: "Entire cabin",
      cleaningFee: 70,
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        "https://images.pexels.com/photos/1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.pexels.com/photos/1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
      ],
      description: `Escape to this charming wooden cabin nestled in the Karkonosze Mountains. This romantic retreat offers stunning mountain views, a cozy fireplace, and all the comforts of home in a peaceful setting.\n\nThe cabin features traditional wooden construction with modern amenities. Perfect for couples or small families looking for a peaceful mountain getaway.\n\nSurrounded by hiking trails, ski slopes, and beautiful nature. A perfect place to disconnect and enjoy the mountain air.`,
      amenities: [
        { name: "Wi-Fi", icon: "Wifi" },
        { name: "Kitchen", icon: "ChefHat" },
        { name: "Fireplace", icon: "Flame" },
        { name: "Heating", icon: "Thermometer" },
        { name: "TV", icon: "Tv" },
        { name: "Garden", icon: "Tree" },
        { name: "Parking", icon: "Car" },
        { name: "Mountain view", icon: "Mountain" },
        { name: "BBQ", icon: "ChefHat" },
        { name: "Hiking trails nearby", icon: "Map" },
        { name: "Ski storage", icon: "Snowflake" },
        { name: "Pet friendly", icon: "Heart" }
      ],
      houseRules: [
        "No smoking",
        "Pets allowed",
        "No parties or events",
        "Quiet hours from 10:00 PM to 8:00 AM",
        "Maximum 4 guests"
      ],
      host: {
        name: "Agnieszka Zielińska",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        joinedYear: "2017",
        isSuperhost: true,
        responseTime: "within 2 hours"
      },
      locationDescription: "Peaceful mountain location in Karpacz with stunning views of the Karkonosze Mountains. Close to hiking trails and ski slopes."
    }
  };

  const mockReviews = [
    {
      id: 1,
      user: {
        name: "Michael Novak",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      rating: 5,
      date: "2024-01-15",
      comment: "Fantastic apartment in an excellent location! Everything was clean and as described. The host was very helpful and responded quickly to messages. Definitely recommend!",
      images: []
    },
    {
      id: 2,
      user: {
        name: "Katherine Wisniewska",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      rating: 5,
      date: "2024-01-08",
      comment: "Perfect accommodation for our stay. Very close to all attractions, yet quiet and peaceful. Equipment at the highest level.",
      images: []
    },
    {
      id: 3,
      user: {
        name: "Peter Zielinski",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4,
      date: "2023-12-22",
      comment: "Very good property, clean and comfortable. The only downside was some street noise at night, but overall very satisfied with the stay.",
      images: []
    },
    {
      id: 4,
      user: {
        name: "Magdalena Kowalczyk",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      rating: 5,
      date: "2023-12-18",
      comment: "Wonderful stay! The property is exactly as in the photos. The host was very nice and helpful. I will definitely return!",
      images: []
    },
    {
      id: 5,
      user: {
        name: "Thomas Lewandowski",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      rating: 4,
      date: "2023-12-10",
      comment: "Good location and clean property. All amenities worked properly. Recommended for people visiting the area.",
      images: []
    },
    {
      id: 6,
      user: {
        name: "Agnes Dabrowska",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
      },
      rating: 5,
      date: "2023-11-28",
      comment: "Perfect property for a romantic getaway. Very stylish and comfortable. The host was very helpful and nice. Highly recommend!",
      images: []
    }
  ];

  useEffect(() => {
    // First try to get property from location state (passed from PropertyCard)
    if (location.state?.property) {
      const propertyFromState = location.state.property;
      
      // Enhance the property data with missing fields from the database
      const enhancedProperty = {
        ...propertyFromState,
        // Map price to pricePerNight if it doesn't exist
        pricePerNight: propertyFromState.pricePerNight || propertyFromState.price,
        // Add missing fields with default values
        reviewCount: propertyFromState.reviewCount || Math.floor(Math.random() * 200) + 50,
        maxGuests: propertyFromState.maxGuests || 4,
        bedrooms: propertyFromState.bedrooms || 2,
        bathrooms: propertyFromState.bathrooms || 1,
        propertyType: propertyFromState.propertyType || "Entire property",
        cleaningFee: propertyFromState.cleaningFee || Math.floor(propertyFromState.price * 0.2),
        description: propertyFromState.description || `Experience the charm of this beautiful property in ${propertyFromState.location}. This well-appointed accommodation offers all the comforts you need for a perfect stay.`,
        amenities: propertyFromState.amenities || [
          { name: "Wi-Fi", icon: "Wifi" },
          { name: "Kitchen", icon: "ChefHat" },
          { name: "Washer", icon: "Shirt" },
          { name: "Air conditioning", icon: "Wind" },
          { name: "Heating", icon: "Thermometer" },
          { name: "TV", icon: "Tv" }
        ],
        houseRules: propertyFromState.houseRules || [
          "No smoking",
          "No pets allowed",
          "No parties or events",
          "Quiet hours from 10:00 PM to 8:00 AM"
        ],
        host: propertyFromState.host || {
          name: "Host",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          joinedYear: "2020",
          isSuperhost: false,
          responseTime: "within 2 hours"
        },
        locationDescription: propertyFromState.locationDescription || `Great location in ${propertyFromState.location}. Close to attractions, restaurants, and public transportation.`
      };
      
      setProperty(enhancedProperty);
      setLoading(false);
    } else if (id) {
      // If no state, try to get from mock database using ID
      const propertyFromDB = mockPropertiesDatabase[id];
      if (propertyFromDB) {
        setProperty(propertyFromDB);
        setLoading(false);
      } else {
        setLoading(false);
        // Property not found
      }
    } else {
      setLoading(false);
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Icon name="Home" size={48} className="text-text-secondary mx-auto mb-4" />
            <h2 className="text-xl font-poppins font-semibold text-text-primary mb-2">
              Property not found
            </h2>
            <p className="text-text-secondary mb-4">
              Sorry, we couldn't find this property.
            </p>
            <Button variant="primary" onClick={() => window.history.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BookingProgressIndicator />
      
      <div className="pt-4 pb-20 md:pb-8">
        {/* Breadcrumb - Desktop */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <nav className="flex items-center space-x-2 text-sm font-inter">
            <a
              href="/homepage"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Home
            </a>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <a
              href="/homepage"
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              Search results
            </a>
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            <span className="text-text-primary font-medium truncate">
              {property.title}
            </span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Property Title - Mobile */}
          <div className="md:hidden mb-4">
            <h1 className="text-xl font-poppins font-semibold text-text-primary mb-2">
              {property.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="font-medium">{property.rating}</span>
                  <span>({property.reviewCount})</span>
                </div>
                <span>•</span>
                <span>{property.location}</span>
              </div>
              <SaveButton property={property} size="sm" />
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <PropertyImageGallery 
              images={property.images} 
              propertyName={property.title}
            />
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Property Info */}
            <div className="lg:col-span-2">
              {/* Desktop Title and Favorite */}
              <div className="hidden md:flex items-start justify-between mb-6">
                <div className="flex-1">
                  <PropertyInfo property={property} />
                </div>
                <SaveButton property={property} size="sm" />
              </div>

              {/* Mobile Property Info */}
              <div className="md:hidden">
                <PropertyInfo property={property} />
              </div>

              {/* Reviews Section */}
              <ReviewsSection 
                reviews={mockReviews}
                rating={property.rating}
                reviewCount={property.reviewCount}
              />

              {/* Location Map */}
              <LocationMap property={property} />
            </div>

            {/* Right Column - Booking Widget (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <BookingWidget property={property} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Bar */}
      <MobileBookingBar 
        property={property}
      />
    </div>
  );
};

export default PropertyDetail;