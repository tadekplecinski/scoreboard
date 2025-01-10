import { Scoreboard } from "../src/scoreboard";
import { wait } from "../src/utils";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  test("should start a new match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    expect(scoreboard.getSortedMatches().length).toBe(1);
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
