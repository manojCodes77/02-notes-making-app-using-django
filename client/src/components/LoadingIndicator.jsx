import React from 'react';

const LoadingBar = ({ width = 'w-full', className = '' }) => (
  <div 
    className={`h-4 bg-gray-200 rounded animate-pulse ${width} ${className}`}
  />
);

const LoadingIndicator = () => {
  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <LoadingBar className="h-6" />
        <LoadingBar width="w-3/4" />
        <LoadingBar width="w-1/2" />
        <LoadingBar />
      </div>
    </div>
  );
};

export default LoadingIndicator;