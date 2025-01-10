import { Scoreboard } from "../src/scoreboard.js";

describe("Scoreboard", () => {
  let scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  test("should start a new match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    expect(scoreboard.matches.length).toBe(1);
  });

  test("should update the score", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 1, 0);
    expect(scoreboard.matches[0].homeScore).toBe(1);
  });

  test("should finish a match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.finishMatch("Mexico", "Canada");
    expect(scoreboard.matches.length).toBe(0);
  });

  test("should return a sorted summary", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 1, 0);
    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.updateScore("Spain", "Brazil", 2, 2);

    const summary = scoreboard.getSummary();
    expect(summary[0].homeTeam).toBe("Spain");
  });
});
