import { runWithInputFile } from "../util";

type Input = string[];

export function parseInput(input: string): Input {
  return input.trim().split("");
}

export function solve1(moves: Input): number {
  // (x,y) = santa's position
  let x = 0,
    y = 0;

  const visitedHouses = new Set();
  visitedHouses.add(`${x},${y}`);

  // move santa's position and add each changed position to the set
  moves.forEach((move) => {
    if (move === "<") {
      x--;
    } else if (move === ">") {
      x++;
    } else if (move === "^") {
      y++;
    } else if (move === "v") {
      y--;
    }

    visitedHouses.add(`${x},${y}`);
  });

  // count unique positions visited by santa in the set
  const totalVisitedHouses = Array.from(visitedHouses.keys()).length;

  return totalVisitedHouses;
}

export function solve2(moves: Input): number {
  // (x1,y1) = santa's position
  // (x2,y2) = robo santa's position
  let x1 = 0,
    y1 = 0,
    x2 = 0,
    y2 = 0;

  const visitedHouses = new Set();
  visitedHouses.add(`${x1},${y1}`);

  // move santa when index is even, and robo santa when it is odd
  // and add each changed position to the set
  moves.forEach((move, i) => {
    if (i % 2 === 0) {
      if (move === "<") {
        x1--;
      } else if (move === ">") {
        x1++;
      } else if (move === "^") {
        y1++;
      } else if (move === "v") {
        y1--;
      }
      visitedHouses.add(`${x1},${y1}`);
    } else {
      if (move === "<") {
        x2--;
      } else if (move === ">") {
        x2++;
      } else if (move === "^") {
        y2++;
      } else if (move === "v") {
        y2--;
      }
      visitedHouses.add(`${x2},${y2}`);
    }
  });

  // count unique positions visited by either santa in the set
  const totalVisitedHouses = Array.from(visitedHouses.keys()).length;

  return totalVisitedHouses;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2015/day-3");
