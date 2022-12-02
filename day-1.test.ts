import { expect, test } from "vitest";
import { solve1, solve2 } from "./day-1";

const parsedInput = [
  [1000, 2000, 3000],
  [4000],
  [5000, 6000],
  [7000, 8000, 9000],
  [10000],
];

test("solve1", () => expect(solve1(parsedInput)).toBe(24000));

test("solve2", () => expect(solve2(parsedInput)).toBe(45000));
