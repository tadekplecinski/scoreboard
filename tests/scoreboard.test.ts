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
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.updateScore("Mexico", "Canada", 1, 0);
    expect(scoreboard.getSummary()[0].homeScore).toBe(1);
  });

  test("should finish a match", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.finishMatch("Mexico", "Canada");
    expect(scoreboard.getSummary().length).toBe(0);
  });
});
