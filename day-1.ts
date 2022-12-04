import { runWithInputFile, sum } from "./util";

function parseInput(input: string): number[][] {
  let result: number[][] = [[]];
  let i = 0;

  input.split("\n").forEach((line) => {
    if (line) {
      result[i].push(parseInt(line, 10));
    } else {
      i++;
      result[i] = [];
    }
  });

  return result;
}

// pick the highest total from any elf in the list
export function solve1(elves: number[][]): number {
  return Math.max(...elves.map(sum));
}

// sort the list descending and take the first 3
export function solve2(elves: number[][]): number {
  const sums = elves.map(sum);
  sums.sort((a, b) => b - a);
  return sum(sums.slice(0, 3));
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "day-1");
