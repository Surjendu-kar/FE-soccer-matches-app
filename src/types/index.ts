export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  status: string;
  matchday: number | null;
}

export interface MatchesResponse {
  success: boolean;
  count: number;
  matches: Match[];
  message?: string;
}