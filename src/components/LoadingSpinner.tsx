import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-4">⚽</div>
        <p className="text-gray-400">Loading upcoming matches...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;