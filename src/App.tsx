import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  status: string;
  matchday: number | null;
}

interface MatchesResponse {
  success: boolean;
  count: number;
  matches: Match[];
  message?: string;
}

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch matches from backend
  const fetchMatches = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<MatchesResponse>(`${API_BASE_URL}/matches`);
      
      if (response.data.success) {
        setMatches(response.data.matches);
        setLastUpdated(new Date());
      } else {
        setError('Failed to fetch matches');
      }
    } catch (err: any) {
      console.error('Error fetching matches:', err);
      setError(err.response?.data?.message || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchMatches();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMatches, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-soccer-dark to-gray-900 text-white font-soccer">
      {/* Header */}
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
              onClick={fetchMatches}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && matches.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin text-4xl mb-4">⚽</div>
              <p className="text-gray-400">Loading upcoming matches...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
            <div className="text-red-400 text-2xl mb-2">⚠️</div>
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={fetchMatches}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-gray-400 text-lg">No upcoming matches found</p>
            <p className="text-gray-500 text-sm mt-2">
              Check back later for new fixtures
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Upcoming Matches ({matches.length})
              </h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 
                           rounded-xl p-6 hover:bg-white/10 transition-all duration-300
                           hover:scale-105 hover:border-soccer-green/30"
                >
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
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p className="text-sm">
            Data provided by{' '}
            <a
              href="https://www.football-data.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soccer-green hover:underline"
            >
              football-data.org
            </a>
          </p>
          <p className="text-xs mt-2">
            Built with React, Node.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;