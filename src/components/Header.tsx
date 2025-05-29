import React from 'react';

interface HeaderProps {
  onRefresh: () => void;
  loading: boolean;
  lastUpdated: Date | null;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, loading, lastUpdated }) => {
  return (
    <header className="bg-black/50 backdrop-blur-sm border-b border-soccer-green/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-soccer-green rounded-full flex items-center justify-center">
              ⚽
            </div>
            <div>
              <h1 className="text-3xl font-bold text-soccer-green">
                Soccer Matches
              </h1>
              <p className="text-gray-400 text-sm">
                Upcoming matches from top competitions
              </p>
            </div>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-4 py-2 bg-soccer-green/20 hover:bg-soccer-green/30 
                     border border-soccer-green/50 rounded-lg transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔄 Loading...' : '🔄 Refresh'}
          </button>
        </div>
        
        {lastUpdated && (
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;