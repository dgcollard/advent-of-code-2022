import { d, t } from "vitest/dist/index-9f5bc072";
import { runWithInputFile } from "../util";

function parseInput(input: string): string[][] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
}

export function solve1(grid: string[][]): number {
  // position of S
  const [[sy, sx]] = find(grid, "S");
  // position of E
  const [[ey, ex]] = find(grid, "E");

  return solve(grid, [sy, sx], [ey, ex]);
}

export function solve2(grid: string[][]): number {
  // positions of each S or a
  const allStarts = [...find(grid, "S"), ...find(grid, "a")];
  // position of E
  const [[ey, ex]] = find(grid, "E");

  const startsGrid: boolean[][] = [];
  for (let y = 0; y < grid.length; y++) {
    startsGrid[y] = [];
    for (let x = 0; x < grid[y].length; x++) {
      startsGrid[y][x] = false;
    }
  }
  allStarts.forEach(([sy, sx]) => {
    startsGrid[sy][sx] = true;
  });

  // eliminate start places that are surrounded by other starts
  // they cannot possibly have shorter paths to E
  const edgeStarts = allStarts.filter(([sy, sx]) => {
    let adj: [number, number][] = [];
    if (sy > 0) {
      adj.push([sy - 1, sx]);
    }
    if (sy < grid.length - 1) {
      adj.push([sy + 1, sx]);
    }
    if (sx > 0) {
      adj.push([sy, sx - 1]);
    }
    if (sx < grid.length - 1) {
      adj.push([sy, sx + 1]);
    }

    return !adj.reduce((c, [sy, sx]) => c && startsGrid[sy][sx], true);
  });

  return Math.min(
    ...edgeStarts.map(([sy, sx]) => solve(grid, [sy, sx], [ey, ex]))
  );
}

function solve(
  grid: string[][],
  [sy, sx]: [number, number],
  [ey, ex]: [number, number]
): number {
  const shortestPaths: number[][] = [];
  for (let i = 0; i < grid.length; i++) {
    shortestPaths[i] = [];
    for (let j = 0; j < grid[i].length; j++) {
      shortestPaths[i][j] = Infinity;
    }
  }
  shortestPaths[sy][sx] = 0;

  const moveStack: [number, number][] = [[sy, sx]];

  while (moveStack.length > 0) {
    const [y, x] = moveStack.pop()!;

    [
      [y, x + 1],
      [y + 1, x],
      [y, x - 1],
      [y - 1, x],
    ]
      .filter(
        ([my, mx]) =>
          // within grid bounds
          my >= 0 &&
          my < grid.length &&
          mx >= 0 &&
          mx < grid[0].length &&
          // at least as high as one shorter
          height(grid[y][x]) >= height(grid[my][mx]) - 1 &&
          // not visited by a shorter path already
          shortestPaths[my][mx] > shortestPaths[y][x] + 1
      )
      .forEach(([my, mx]) => {
        shortestPaths[my][mx] = shortestPaths[y][x] + 1;
        moveStack.push([my, mx]);
      });
  }

  return shortestPaths[ey][ex];
}

// returns the height of a letter, a lowest to z highest
// S is start equivalent to a
// E is end equivalent to z
function height(chr: string) {
  if (chr === "S") return 1;
  if (chr === "E") return 26;
  return "abcdefghijklmnopqrstuvwxyz".indexOf(chr) + 1;
}

// finds position of a letter in the grid
function find(grid: string[][], char: string): [number, number][] {
  const res: [number, number][] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === char) {
        res.push([y, x]);
      }
    }
  }

  return res;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2022/day-12");
