import { runWithInputFile, sum } from "../util";

function parseInput1(input: string): string[][] {
  return input
    .split("\n")
    .filter((line) => !!line)
    .map((line) => [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2),
    ]);
}

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// find the item letter that appears in both parts,
// add its number to the score
export function solve1(backpacks: string[][]): number {
  return sum(
    backpacks.map(([front, back]) => {
      // find letter that appears in both parts
      const letter = [...front].find((l) => back.includes(l));
      if (!letter) return 0;
      return alphabet.indexOf(letter) + 1;
    })
  );
}

function parseInput2(input: string): string[][] {
  let result: string[][] = [];
  const split = input.split("\n").filter((line) => line.length);

  for (let i = 0; i < split.length; i += 3) {
    result.push(split.slice(i, i + 3));
  }

  return result;
}

export function solve2(backpacks: string[][]): number {
  return sum(
    backpacks.map((backpack) => {
      // find letter that appears in all parts
      return (
        [...alphabet].findIndex((letter) =>
          backpack.every((pocket) => pocket.includes(letter))
        ) + 1
      );
    })
  );
}

function main(input: string) {
  const parsedInput1 = parseInput1(input);
  console.log(solve1(parsedInput1));
  const parsedInput2 = parseInput2(input);
  console.log(solve2(parsedInput2));
}

runWithInputFile(main, "year-2022/day-3");
