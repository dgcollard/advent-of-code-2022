import { reverse, runWithInputFile } from "../util";

export type ParsedInput = {
  stacks: {
    [stackId: string]: string;
  };
  instructions: [number, string, string][];
};

export function parseInput(input: string): ParsedInput {
  const result: ParsedInput = {
    stacks: {},
    instructions: [],
  };

  input.split("\n").forEach((line) => {
    if (line.includes("[")) {
      for (let i = 0; i * 4 < line.length; i++) {
        // pick out the crate label from between the [ ]
        const char = line.charAt(i * 4 + 1);
        // there is no crate in this column
        if (char === " ") continue;
        const stackId = String(i + 1);
        result.stacks[stackId] ??= "";
        result.stacks[stackId] = char + result.stacks[stackId];
      }
    } else if (line.includes("move")) {
      const match = line.match(/^move (\d+) from (\d+) to (\d+)$/);
      if (match) {
        const [, len, from, to] = match;
        result.instructions.push([Number(len), from, to]);
      }
    }
  });

  return result;
}

// apply each move instruction to the stack, popping and pushing the crates
// one at a time (reversing the string segment)
export function solve1({
  stacks: initialStacks,
  instructions,
}: ParsedInput): string {
  const result = instructions.reduce(
    (stacks, [len, from, to]) => ({
      ...stacks,
      [from]: stacks[from].slice(0, stacks[from].length - len),
      [to]: stacks[to] + reverse(stacks[from].slice(-len)),
    }),
    initialStacks
  );

  return Object.values(result)
    .map((stack) => stack.slice(-1))
    .join("");
}

// same as part 1, but now multiple crates are moved at once during the rearrangement
// so the moved section does not need to be reversed
export function solve2({
  stacks: initialStacks,
  instructions,
}: ParsedInput): string {
  const result = instructions.reduce(
    (stacks, [len, from, to]) => ({
      ...stacks,
      [from]: stacks[from].slice(0, stacks[from].length - len),
      [to]: stacks[to] + stacks[from].slice(-len),
    }),
    initialStacks
  );

  return Object.values(result)
    .map((stack) => stack.slice(-1))
    .join("");
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2022/day-5");
