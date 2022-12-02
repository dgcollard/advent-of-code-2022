import fs from "fs";
import path from "path";

function parseInput(input: string): string[][] {
  let result: string[][] = [[]];
  let i = 0;

  input.split("\n").forEach((line) => {
    result.push(line.split(" "));
  });

  return result;
}

const pointsForWin = 6;
const pointsForDraw = 3;
const pointsForRock = 1;
const pointsForPaper = 2;
const pointsForScissors = 3;

// total all games of rock (A/X), paper (B/Y), scissors (C/Z)
// X = +1, Y = +2, Z = +3
// A < Y, B < Z, C < X = +6
// A = X, B = Y, C = Z = +3
export function solve1(games: string[][]): number {
  let score = 0;

  games.forEach(([you, me]) => {
    if (me === "X") {
      score += pointsForRock;
      score += you === "C" ? pointsForWin : you === "A" ? pointsForDraw : 0;
    } else if (me === "Y") {
      score += pointsForPaper;
      score += you === "A" ? pointsForWin : you === "B" ? pointsForDraw : 0;
    } else if (me === "Z") {
      score += pointsForScissors;
      score += you === "B" ? pointsForWin : you === "C" ? pointsForDraw : 0;
    }
  });

  return score;
}

// total all games of rock paper scissors, but second column is the
// outcome of the game; X = lose, Y = draw, Z = win
export function solve2(games: string[][]): number {
  let score = 0;

  games.forEach(([you, outcome]) => {
    if (outcome === "X") {
      score +=
        you === "A"
          ? pointsForScissors
          : you === "B"
          ? pointsForRock
          : you === "C"
          ? pointsForPaper
          : 0;
    } else if (outcome === "Y") {
      score += pointsForDraw;
      score +=
        you === "A"
          ? pointsForRock
          : you === "B"
          ? pointsForPaper
          : you === "C"
          ? pointsForScissors
          : 0;
    } else if (outcome === "Z") {
      score += pointsForWin;
      score +=
        you === "A"
          ? pointsForPaper
          : you === "B"
          ? pointsForScissors
          : you === "C"
          ? pointsForRock
          : 0;
    }
  });

  return score;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

if (!process.env.TEST) {
  main(
    fs.readFileSync(path.join(__dirname, "day-2.input.txt"), {
      encoding: "utf-8",
    })
  );
}
