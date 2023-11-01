import { expect, test } from "vitest";
import { solve1, solve2 } from "./day-3";

const parsedInput1 = [
  ["vJrwpWtwJgWr", "hcsFMMfFFhFp"],
  ["jqHRNqRjqzjGDLGLrs", "FMfFZSrLrFZsSL"],
  ["PmmdzqPrV", "vPwwTWBwg"],
  ["wMqvLMZHhHMvwLH", "jbvcjnnSBnvTQFn"],
  ["ttgJtRGJ", "QctTZtZT"],
  ["CrZsJsPPZsGz", "wwsLwLmpwMDw"],
];

test("solve1", () => expect(solve1(parsedInput1)).toBe(157));

const parsedInput2 = [
  [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
  ],
  [
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ],
];

test("solve2", () => expect(solve2(parsedInput2)).toBe(70));
