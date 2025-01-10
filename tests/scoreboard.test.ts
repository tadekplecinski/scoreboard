import { Scoreboard } from "../src/scoreboard";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  describe("Start a match", () => {
    it("should start a new match", () => {
      scoreboard.startMatch("Mexico", "Canada");
      expect(scoreboard.getSortedMatches().length).toBe(1);
    });

    it("should throw an error when a match between given teams is in progress", () => {
      const homeTeam = "Mexico";
      const awayTeam = "Canada";

      scoreboard.startMatch(homeTeam, awayTeam);
      expect(() => scoreboard.startMatch(awayTeam, homeTeam)).toThrow(
        `A match between ${awayTeam} and ${homeTeam} is already in progress.`
      );
    });
  });

  describe("Finish a match", () => {
    it("should finish a match", () => {
      const matchId = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.finishMatch(matchId);
      expect(scoreboard.getSortedMatches().length).toBe(0);
    });

    it("should throw an error if the match ID is not found", () => {
      const invalidMatchId = "invalid-id";

      expect(() => scoreboard.finishMatch(invalidMatchId)).toThrow(
        `Match with ID "${invalidMatchId}" not found`
      );
    });
  });

  describe("Update score", () => {
    it("should update the score", () => {
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

      expect(() => scoreboard.updateScore(matchId, -1, 0)).toThrow(
        "Scores cannot be negative."
      );

      expect(() => scoreboard.updateScore(matchId, 0, -1)).toThrow(
        "Scores cannot be negative."
      );

      expect(() => scoreboard.updateScore(matchId, -1, -1)).toThrow(
        "Scores cannot be negative."
      );
    });
  });

  describe("Match sorting", () => {
    it("should return matches sorted by total score", () => {
      const match1Id = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore(match1Id, 1, 0);

      const match2Id = scoreboard.startMatch("Spain", "Brazil");
      scoreboard.updateScore(match2Id, 2, 2);

      const sortedMatches = scoreboard.getSortedMatches();
      expect(sortedMatches[0].homeTeam).toBe("Spain");
    });

    it("should return matches sorted by date if total score is equal", () => {
      jest.useFakeTimers();

      const match1Id = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore(match1Id, 1, 0);

      jest.advanceTimersByTime(1000);

      const match2Id = scoreboard.startMatch("Spain", "Brazil");
      scoreboard.updateScore(match2Id, 0, 1);

      const sortedMatches = scoreboard.getSortedMatches();

      expect(sortedMatches[0].homeTeam).toBe("Spain");

      jest.useRealTimers();
    });
  });
});
