import { Scoreboard } from "../src/scoreboard";
import { wait } from "../src/utils";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  describe("Start a match", () => {
    test("should start a new match", () => {
      scoreboard.startMatch("Mexico", "Canada");
      expect(scoreboard.getSortedMatches().length).toBe(1);
    });

    test("should throw an error when a match between given teams is in progress", () => {
      const homeTeam = "Mexico";
      const awayTeam = "Canada";

      scoreboard.startMatch(homeTeam, awayTeam);
      expect(() => scoreboard.startMatch(awayTeam, homeTeam)).toThrow(
        `A match between ${awayTeam} and ${homeTeam} is already in progress.`
      );
    });
  });

  describe("Finish a match", () => {
    test("should finish a match", () => {
      const matchId = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.finishMatch(matchId);
      expect(scoreboard.getSortedMatches().length).toBe(0);
    });

    it("should throw an error if the match ID is not found", () => {
      const invalidMatchId = "invalid-id";

      expect(() => scoreboard.finishMatch(invalidMatchId)).toThrowError(
        'Match with ID "invalid-id" not found'
      );
    });
  });

  describe("Update score", () => {
    test("should update the score", () => {
      const matchId = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore(matchId, 1, 0);
      expect(scoreboard.getSortedMatches()[0].homeScore).toBe(1);
    });

    it("should throw an error if the match is not found", () => {
      const invalidMatchId = "invalid-id";
      expect(() => scoreboard.updateScore(invalidMatchId, 1, 2)).toThrow(
        `Match with ID "${invalidMatchId}" not found for updating the score.`
      );
    });

    it("should throw an error if either score is negative", () => {
      const matchId = scoreboard.startMatch("Mexico", "Canada");
      expect(() => scoreboard.updateScore(matchId, -1, -2)).toThrow(
        "Scores cannot be negative."
      );
    });
  });

  describe("Match summary", () => {
    test("should return matches sorted by total score", () => {
      const match1Id = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore(match1Id, 1, 0);

      const match2Id = scoreboard.startMatch("Spain", "Brazil");
      scoreboard.updateScore(match2Id, 2, 2);

      const summary = scoreboard.getSortedMatches();
      expect(summary[0].homeTeam).toBe("Spain");
    });

    test("should return matches sorted by date if total score is equal", () => {
      jest.useFakeTimers();

      const match1Id = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore(match1Id, 1, 0);

      jest.advanceTimersByTime(1000);

      const match2Id = scoreboard.startMatch("Spain", "Brazil");
      scoreboard.updateScore(match2Id, 0, 1);

      const summary = scoreboard.getSortedMatches();

      expect(summary[0].homeTeam).toBe("Spain");

      jest.useRealTimers();
    });
  });
});
