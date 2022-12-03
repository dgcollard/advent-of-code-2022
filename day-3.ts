import fs from "fs";
import path from "path";
import { sum } from "./util";

function parseInput1(input: string): string[][] {
  let result: string[][] = [];

  input.split("\n").forEach((line) => {
    if (!line) return;
    result.push([line.slice(0, line.length / 2), line.slice(line.length / 2)]);
  });

  return result;
}

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
  ""
);

// find the item letter that appears in both parts,
// add its number to the score
export function solve1(backpacks: string[][]): number {
  return sum(
    backpacks.map(
      ([front, back]) =>
        alphabet.indexOf(front.split("").find((l) => back.includes(l)) ?? "") +
        1
    )
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
    backpacks.map(
      (backpack) =>
        alphabet.findIndex((letter) =>
          backpack.every((pocket) => pocket.includes(letter))
        ) + 1
    )
  );
}

function main(input: string) {
  const parsedInput1 = parseInput1(input);
  console.log(solve1(parsedInput1));
  const parsedInput2 = parseInput2(input);
  console.log(solve2(parsedInput2));
}

if (!process.env.TEST) {
  main(
    fs.readFileSync(path.join(__dirname, "day-3.input.txt"), {
      encoding: "utf-8",
    })
  );
}
