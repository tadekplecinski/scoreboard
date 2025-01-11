import { generateId } from "./utils";

export interface Match {
  readonly homeTeam: string;
  readonly awayTeam: string;
  homeScore: number;
  awayScore: number;
  readonly startTime: Date;
  readonly id: string;
}

export class Scoreboard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): string {
    const existingMatch = this.matches.find(
      (match) =>
        (match.homeTeam === homeTeam && match.awayTeam === awayTeam) ||
        (match.homeTeam === awayTeam && match.awayTeam === homeTeam)
    );

    if (existingMatch) {
      throw new Error(
        `A match between ${homeTeam} and ${awayTeam} is already in progress.`
      );
    }

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
    if (homeScore < 0 || awayScore < 0) {
      throw new Error("Scores cannot be negative.");
    }

    const match = this.matches.find((m) => m.id === matchId);

    if (!match) {
      throw new Error(
        `Match with ID "${matchId}" not found for updating the score.`
      );
    }

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  finishMatch(matchId: string) {
    const match = this.matches.find((m) => m.id === matchId);

    if (!match) {
      throw new Error(`Match with ID "${matchId}" not found`);
    }

    this.matches = this.matches.filter((m) => m.id !== matchId);
  }

  private sortMatches(a: Match, b: Match): number {
    const isTotalScoreEqual =
      a.homeScore + a.awayScore === b.homeScore + b.awayScore;

    if (isTotalScoreEqual) {
      return b.startTime.getTime() - a.startTime.getTime();
    }
    return b.homeScore + b.awayScore - (a.homeScore + a.awayScore);
  }

  getSortedMatches(): Match[] {
    return [...this.matches].sort(this.sortMatches);
  }

  getFormattedSummary(): string[] {
    return this.getSortedMatches().map(
      (match) =>
        `${match.homeTeam} ${match.homeScore} - ${match.awayTeam} ${match.awayScore}`
    );
  }
}
