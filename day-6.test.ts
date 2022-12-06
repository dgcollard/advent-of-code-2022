import { expect, test } from "vitest";
import { solve1, solve2, uniqueChars } from "./day-6";

const parsedInput = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

test("uniqueChars", () => {
  expect(uniqueChars("abcdefghijklmnopqrstuvwxyz")).toBe(true);
  expect(uniqueChars("ababababababababababababab")).toBe(false);
});

test("solve1", () => {
  expect(solve1(parsedInput)).toBe(7);

  expect(solve1("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5);
  expect(solve1("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6);
  expect(solve1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10);
  expect(solve1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11);
});

test("solve2", () => {
  expect(solve2("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(19);

  expect(solve2("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(23);
  expect(solve2("nppdvjthqldpwncqszvftbrmjlhg")).toBe(23);
  expect(solve2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(29);
  expect(solve2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(26);
});
