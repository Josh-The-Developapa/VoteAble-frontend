import React from 'react';
import './PollSkeleton.css';

const PollSkeleton = ({ screenWidth }) => {
  // Determine number of skeleton cards to show
  const getSkeletonCount = () => {
    if (screenWidth < 680) return 3; // Mobile view
    return 4; // Desktop view - can be 2-4 options
  };

  const skeletonCount = getSkeletonCount();

  return (
    <div className="pollContainer">
      {/* Header Skeleton */}
      <div className="header">
        <div className="skeleton-header">
          <div className="skeleton-title skeleton-animate"></div>
          <div className="skeleton-question skeleton-animate"></div>
        </div>
      </div>

      {/* Error/Success Message Skeleton */}
      <div className="skeleton-message skeleton-animate"></div>

      {/* Mobile Skeleton */}
      {screenWidth < 680 && (
        <div className="candidates">
          {[...Array(skeletonCount)].map((_, index) => (
            <div
              key={index}
              className="skeleton-candidate-mobile skeleton-animate"
            >
              <div className="skeleton-image-mobile"></div>
              <div className="skeleton-info-mobile">
                <div className="skeleton-class-mobile skeleton-animate"></div>
                <div className="skeleton-name-mobile skeleton-animate"></div>
              </div>
            </div>
          ))}
          <div className="buttonContainer">
            <div className="skeleton-button skeleton-animate"></div>
            <div className="skeleton-button skeleton-animate"></div>
          </div>
        </div>
      )}

      {/* Desktop Skeleton - Many Options (4+) */}
      {skeletonCount >= 4 && screenWidth >= 680 && (
        <div className="candidates">
          {[...Array(skeletonCount)].map((_, index) => (
            <div
              key={index}
              className="skeleton-candidate-many skeleton-animate"
            >
              <div className="skeleton-image-many"></div>
              <div className="skeleton-info-many">
                <div className="skeleton-class-many skeleton-animate"></div>
                <div className="skeleton-name-many skeleton-animate"></div>
              </div>
            </div>
          ))}
          <div className="buttonContainer">
            <div className="skeleton-button skeleton-animate"></div>
            <div className="skeleton-button skeleton-animate"></div>
          </div>
        </div>
      )}

      {/* Desktop Skeleton - Few Options (<4) */}
      {skeletonCount < 4 && screenWidth >= 680 && (
        <div className="candidates">
          {[...Array(skeletonCount)].map((_, index) => (
            <div
              key={index}
              className="skeleton-candidate-regular skeleton-animate"
            >
              <div className="skeleton-image-regular"></div>
              <div className="skeleton-info-regular">
                <div className="skeleton-class-regular skeleton-animate"></div>
                <div className="skeleton-name-regular skeleton-animate"></div>
              </div>
            </div>
          ))}
          <div className="buttonContainer">
            <div className="skeleton-button skeleton-animate"></div>
            <div className="skeleton-button skeleton-animate"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollSkeleton;
