import { expect, test } from "vitest";
import { Input, solve1, solve2 } from "./day-9";

const parsedInput1: Input = [
  ["R", 4],
  ["U", 4],
  ["L", 3],
  ["D", 1],
  ["R", 4],
  ["D", 1],
  ["L", 5],
  ["R", 2],
];

test("solve1", () => {
  expect(solve1(parsedInput1)).toBe(13);
});

const parsedInput2: Input = [
  ["R", 5],
  ["U", 8],
  ["L", 8],
  ["D", 3],
  ["R", 17],
  ["D", 10],
  ["L", 25],
  ["U", 20],
];

test("solve2", () => {
  expect(solve2(parsedInput2)).toBe(36);
});
