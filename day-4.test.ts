import { expect, test } from "vitest";
import { solve1, solve2 } from "./day-4";

const parsedInput = [
  [2, 4, 6, 8],
  [2, 3, 4, 5],
  [5, 7, 7, 9],
  [2, 8, 3, 7],
  [6, 6, 4, 6],
  [2, 6, 4, 8],
];

test("solve1", () => expect(solve1(parsedInput)).toBe(2));

test("solve2", () => expect(solve2(parsedInput)).toBe(4));
