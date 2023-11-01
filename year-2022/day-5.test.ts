import { expect, test } from "vitest";
import { ParsedInput, parseInput, solve1, solve2 } from "./day-5";

const input = [
  "    [D]     ",
  "[N] [C]     ",
  "[Z] [M] [P] ",
  " 1   2   3  ",
  "",
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2",
].join("\n");

const parsedInput: ParsedInput = {
  stacks: {
    1: "ZN",
    2: "MCD",
    3: "P",
  },
  instructions: [
    [1, "2", "1"],
    [3, "1", "3"],
    [2, "2", "1"],
    [1, "1", "2"],
  ],
};

test("parseInput", () => expect(parseInput(input)).toEqual(parsedInput));

test("solve1", () => expect(solve1(parsedInput)).toBe("CMZ"));

test("solve2", () => expect(solve2(parsedInput)).toBe("MCD"));
