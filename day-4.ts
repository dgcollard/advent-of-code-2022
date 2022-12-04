import { runWithInputFile } from "./util";

function parseInput(input: string): number[][] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(/[,-]/).map(Number));
}

// check if n is between a and b inclusive
function inRange(n: number, a: number, b: number): boolean {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return n >= min && n <= max;
}

// find how many assignments completely overlap
export function solve1(assignments: number[][]): number {
  return assignments.reduce(
    (count, [a0, a1, b0, b1]) =>
      (inRange(a0, b0, b1) && inRange(a1, b0, b1)) ||
      (inRange(b0, a0, a1) && inRange(b1, a0, a1))
        ? count + 1
        : count,
    0
  );
}

// find how many assignments overlap at least partially
export function solve2(assignments: number[][]): number {
  return assignments.reduce(
    (count, [a0, a1, b0, b1]) =>
      inRange(a0, b0, b1) ||
      inRange(a1, b0, b1) ||
      inRange(b0, a0, a1) ||
      inRange(b1, a0, a1)
        ? count + 1
        : count,
    0
  );
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "day-4");
