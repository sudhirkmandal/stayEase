import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, rating, reviewCount }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const reviewFilters = [
    { id: 'all', label: 'All', count: reviewCount },
    { id: '5', label: '5 stars', count: reviews.filter(r => r.rating === 5).length },
    { id: '4', label: '4 stars', count: reviews.filter(r => r.rating === 4).length },
    { id: '3', label: '3 stars', count: reviews.filter(r => r.rating === 3).length },
  ];

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(selectedFilter));

  const displayedReviews = showAllReviews 
    ? filteredReviews 
    : filteredReviews.slice(0, 6);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={`${
          index < rating 
            ? 'text-warning fill-current' :'text-border'
        }`}
      />
    ));
  };

  return (
    <div className="py-8 border-b border-border">
      {/* Reviews Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={20} className="text-warning fill-current" />
          <span className="text-2xl font-poppins font-semibold text-text-primary">
            {rating}
          </span>
        </div>
        <span className="text-text-secondary">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      </div>

      {/* Review Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {reviewFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? 'primary' : 'outline'}
            onClick={() => setSelectedFilter(filter.id)}
            className="text-sm"
          >
            {filter.label} ({filter.count})
          </Button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="space-y-3">
            {/* Reviewer Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={review.user.avatar}
                  alt={`${review.user.name} - avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-inter font-medium text-text-primary">
                  {review.user.name}
                </h4>
                <p className="text-sm text-text-secondary">
                  {formatDate(review.date)}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
            </div>

            {/* Review Content */}
            <p className="text-text-primary leading-relaxed">
              {review.comment}
            </p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto">
                {review.images.map((image, index) => (
                  <div key={index} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Review photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {filteredReviews.length > 6 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-8"
          >
            {showAllReviews 
              ? 'Show fewer reviews' 
              : `Show all ${filteredReviews.length} reviews`
            }
          </Button>
        </div>
      )}

      {/* No Reviews Message */}
      {filteredReviews.length === 0 && selectedFilter !== 'all' && (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">
            No reviews for the selected filter
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;