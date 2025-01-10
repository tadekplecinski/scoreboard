import { Scoreboard } from "../src/scoreboard";
import { wait } from "../src/utils";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  test("should start a new match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    expect(scoreboard.getSummary().length).toBe(1);
  });

  test("should update the score", () => {
    const matchId = scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore(matchId, 1, 0);
    expect(scoreboard.getSummary()[0].homeScore).toBe(1);
  });

  test("should finish a match", () => {
    const matchId = scoreboard.startMatch("Mexico", "Canada");
    scoreboard.finishMatch(matchId);
    expect(scoreboard.getSummary().length).toBe(0);
  });

  describe("Match summary", () => {
    test("should return matches sorted by total score", () => {
      const match1Id = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore(match1Id, 1, 0);

      const match2Id = scoreboard.startMatch("Spain", "Brazil");
      scoreboard.updateScore(match2Id, 2, 2);

      const summary = scoreboard.getSummary();
      expect(summary[0].homeTeam).toBe("Spain");
    });

    test("should return matches sorted by date if total score is equal", async () => {
      const match1Id = scoreboard.startMatch("Mexico", "Canada");
      scoreboard.updateScore(match1Id, 1, 0);

      await wait();

      const match2Id = scoreboard.startMatch("Spain", "Brazil");
      scoreboard.updateScore(match2Id, 0, 1);

      const summary = scoreboard.getSummary();
      console.log("summary", summary);

      expect(summary[0].homeTeam).toBe("Spain");
    });
  });
});
