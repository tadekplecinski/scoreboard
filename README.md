# Live Football World Cup Scoreboard

This project implements a simple football scoreboard application that allows you to manage matches, update scores, and sort matches based on their scores and start times. The scoreboard keeps track of match details like team names, scores, and match start times, and provides methods for starting, updating, and finishing matches.

## Features

- **Start Match**: Start a new match between two teams with a unique match ID.
- **Update Score**: Update the score of an ongoing match.
- **Finish Match**: Mark a match as finished and remove it from the active match list.
- **Match Sorting**: Get a sorted list of matches based on total score or start time.
- **Input Validation**: Prevents the starting of a match with the same teams, and ensures scores cannot be negative.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository to your local machine:
   `git clone https://github.com/tadekplecinski/scoreboard`
2. Navigate into the project directory:
   `cd scoreboard`
3. Install dependencies:
   `npm install`

## Usage

### Starting a Match

You can start a new match by calling the `startMatch` method, passing the names of the home and away teams.

```
const matchId = scoreboard.startMatch('Team A', 'Team B');
```

### Updating the score

To update the score for a specific match, call the `updateScore` method with the match ID and the new scores for the home and away teams.

```
scoreboard.updateScore(matchId, 2, 1);
```

### Finishing a Match

You can finish a match and remove it from the active list by calling the `finishMatch` method with the match ID.

```
scoreboard.finishMatch(matchId);
```

### Sorting Matches

The matches can be sorted by total score or by start time using the `getSortedMatches` method.

```
const sortedMatches = scoreboard.getSortedMatches();
```

## Tests

The project includes tests for all the core functionalities, such as starting matches, updating scores, finishing matches, and sorting matches.

To run the tests, use the following command:

```
npm test
```

## Project Structure

- `src/`: Contains the main code of the scoreboard application.
- `tests/`: Contains the test cases for the application.
- `utils.ts`: Contains utility functions like generateId.
- `scoreboard.ts`: Contains the main Scoreboard class.

## Technologies Used

- **TypeScript**: For type-safe code.
- **Jest**: For testing the application.
- **ESLint**: For code linting and enforcing coding standards

## Contributing

Contributions are welcome! If you find any bugs or would like to suggest improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
