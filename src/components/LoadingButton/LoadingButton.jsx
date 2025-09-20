import React from 'react';
import './LoadingButton.css';

const LoadingButton = ({
  loading,
  disabled,
  onClick,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`${className} ${loading ? 'loading-button' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="loading-content">
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <span className="loading-text">Voting</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
