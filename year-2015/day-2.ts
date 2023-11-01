import { runWithInputFile, sum } from "../util";

type Input = number[][];

function parseInput(input: string): Input {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split("x").map(Number));
}

export function solve1(boxes: Input): number {
  function surfaceArea(l: number, w: number, h: number): number {
    return 2 * l * w + 2 * w * h + 2 * l * h;
  }

  function slackArea(l: number, w: number, h: number): number {
    return Math.min(l * w, w * h, l * h);
  }

  const totalArea = sum(
    boxes.map(([l, w, h]) => surfaceArea(l, w, h) + slackArea(l, w, h))
  );

  return totalArea;
}

export function solve2(boxes: Input): number {
  function shortestPerimeter(l: number, w: number, h: number): number {
    return Math.min(2 * l + 2 * w, 2 * w + 2 * h, 2 * l + 2 * h);
  }

  function volume(l: number, w: number, h: number): number {
    return l * w * h;
  }

  const totalRibbon = sum(
    boxes.map(([l, w, h]) => shortestPerimeter(l, w, h) + volume(l, w, h))
  );

  return totalRibbon;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2015/day-2");
