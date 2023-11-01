import { describe, expect, test } from "vitest";
import { parseInput, solve1, solve2 } from "./day-3";

test("solve1", () => {
  expect(solve1(parseInput(">"))).toBe(2);
  expect(solve1(parseInput("^>v<"))).toBe(4);
  expect(solve1(parseInput("^v^v^v^v^v"))).toBe(2);
});

test("solve2", () => {
  expect(solve2(parseInput("^v"))).toBe(3);
  expect(solve2(parseInput("^>v<"))).toBe(3);
  expect(solve2(parseInput("^v^v^v^v^v"))).toBe(11);
});
