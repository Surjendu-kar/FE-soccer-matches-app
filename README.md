# Soccer Matches App

A web application that displays upcoming soccer matches using the Football-Data.org API.

## Live Demo

- Frontend: [https://fe-soccer-matches-app.vercel.app/](https://fe-soccer-matches-app.vercel.app/)
- Backend API: [https://be-soccer-matches-app.vercel.app/](https://be-soccer-matches-app.vercel.app/)

## API Information

This project uses the [Football-Data.org API](https://www.football-data.org/) to fetch soccer match data. The API provides comprehensive football data including:
- Upcoming matches
- Team information
- Match schedules

## Features

- Display upcoming soccer matches
- Show match details including:
  - Home and away teams
  - Competition name
  - Scheduled date and time
  - Match status
  - Matchday number
- Responsive design
- Real-time data updates

## Tech Stack

### Frontend
- React.js
- Tailwind CSS (for styling)
- Vercel (Deployment)

### Backend
- Node.js
- Express.js
- Football-Data.org API
- Vercel (Deployment)

## API Endpoints

The backend provides the following endpoints:

- `GET /api/matches` - Get upcoming matches
- `GET /api/health` - Health check endpoint
- `GET /` - API information

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Football-Data.org API key:
   ```
   FOOTBALL_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## License

ISC