export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: Date;
}

export class Scoreboard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string) {
    // Implementation
  }

  updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ) {
    // Implementation
  }

  finishMatch(homeTeam: string, awayTeam: string) {
    // Implementation
  }

  getSummary(): Array<Match> {
    return this.matches;
  }
}
