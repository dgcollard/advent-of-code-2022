import { expect, test } from "vitest";
import { solve1, solve2 } from "./day-8";

const parsedInput = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];

test("solve1", () => {
  expect(solve1(parsedInput)).toBe(21);
});

test("solve2", () => {
  expect(solve2(parsedInput)).toBe(8);
});
