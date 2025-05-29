import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import MatchCard from './components/MatchCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';

// Types
import { Match, MatchesResponse } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

  useEffect(() => {
    fetchMatches();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMatches, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Render main content based on state
  const renderMainContent = () => {
    if (loading && matches.length === 0) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage error={error} onRetry={fetchMatches} />;
    }

    if (matches.length === 0) {
      return <EmptyState />;
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Upcoming Matches ({matches.length})
          </h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soccer-dark to-gray-900 text-white font-soccer">
      <Header 
        onRefresh={fetchMatches}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      <main className="container mx-auto px-4 py-8">
        {renderMainContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;