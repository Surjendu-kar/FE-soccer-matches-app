import React from 'react';
import { Match } from '../types';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  // Format date and time
  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Get time until match
  const getTimeUntilMatch = (dateString: string): string => {
    const matchDate = new Date(dateString);
    const now = new Date();
    const diff = matchDate.getTime() - now.getTime();
    
    if (diff < 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Soon';
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 
                   rounded-xl p-6 hover:bg-white/10 transition-all duration-300
                   hover:scale-105 hover:border-soccer-green/30">
      {/* Competition */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-soccer-green 
                       bg-soccer-green/20 px-2 py-1 rounded-full">
          {match.competition}
        </span>
        <span className="text-xs text-gray-400">
          {getTimeUntilMatch(match.date)}
        </span>
      </div>

      {/* Teams */}
      <div className="text-center mb-4">
        <div className="text-lg font-bold mb-1">
          {match.homeTeam}
        </div>
        <div className="text-2xl font-bold text-soccer-green mb-1">
          VS
        </div>
        <div className="text-lg font-bold">
          {match.awayTeam}
        </div>
      </div>

      {/* Match Details */}
      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex items-center justify-between">
          <span>📅 Date & Time:</span>
        </div>
        <div className="text-white font-medium text-center">
          {formatDateTime(match.date)}
        </div>
        
        {match.matchday && (
          <div className="flex items-center justify-between">
            <span>🗓️ Matchday:</span>
            <span className="text-white">{match.matchday}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span>⚡ Status:</span>
          <span className="text-yellow-400 capitalize">
            {match.status.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;