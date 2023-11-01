import { expect, test } from "vitest";
import { solve1, solve2 } from "./day-2";

const parsedInput = [
  ["A", "Y"],
  ["B", "X"],
  ["C", "Z"],
];

test("solve1", () => expect(solve1(parsedInput)).toBe(15));

test("solve2", () => expect(solve2(parsedInput)).toBe(12));
