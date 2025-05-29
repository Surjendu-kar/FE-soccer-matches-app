import React from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
      <div className="text-red-400 text-2xl mb-2">⚠️</div>
      <p className="text-red-300 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;