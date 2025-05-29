import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🏆</div>
      <p className="text-gray-400 text-lg">No upcoming matches found</p>
      <p className="text-gray-500 text-sm mt-2">
        Check back later for new fixtures
      </p>
    </div>
  );
};

export default EmptyState;