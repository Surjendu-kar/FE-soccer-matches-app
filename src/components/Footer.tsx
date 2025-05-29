import React from 'react';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;