import { Scoreboard } from "../src/scoreboard";

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
});
