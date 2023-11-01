import { runWithInputFile } from "../util";

function parseInput(input: string): string {
  return input.trim();
}

// check if all the characters in a string are unique
export function uniqueChars(str: string): boolean {
  for (let i = 0; i < str.length - 1; i++) {
    if (str.slice(i + 1).indexOf(str.charAt(i)) !== -1) {
      return false;
    }
  }
  return true;
}

// find first substring of four distinct characters
export function solve1(input: string): number {
  for (let i = 4; i < input.length; i++) {
    if (uniqueChars(input.slice(i - 4, i))) {
      return i;
    }
  }
  return -1;
}

// find first substring of fourteen distinct characters
export function solve2(input: string): number {
  for (let i = 14; i < input.length; i++) {
    if (uniqueChars(input.slice(i - 14, i))) {
      return i;
    }
  }
  return -1;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2022/day-6");
