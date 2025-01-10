import { generateId } from "./utils";

export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  startTime: Date;
  id: string;
}

export class Scoreboard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): string {
    const id = generateId();

    this.matches.push({
      homeTeam,
      awayTeam,
      homeScore: 0,
      awayScore: 0,
      startTime: new Date(),
      id,
    });

    return id;
  }

  updateScore(matchId: string, homeScore: number, awayScore: number) {
    const match = this.matches.find((m) => m.id === matchId);

    if (!match) {
      throw new Error("Match not found");
    }

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  finishMatch(matchId: string) {
    this.matches = this.matches.filter((m) => m.id !== matchId);
  }

  getSummary(): Match[] {
    return this.matches;
  }
}
