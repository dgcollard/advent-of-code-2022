import { runWithInputFile } from "../util";

function parseInput(input: string): string[] {
  const result = input.split("");

  return result;
}

export function solve1(chars: string[]): number {
  let floor = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === "(") {
      floor++;
    }
    if (char === ")") {
      floor--;
    }
  }

  return floor;
}

export function solve2(chars: string[]): number {
  let floor = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    if (char === "(") {
      floor++;
    }
    if (char === ")") {
      floor--;
    }

    if (floor < 0) {
      return i + 1;
    }
  }

  return -1;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2015/day-1");
