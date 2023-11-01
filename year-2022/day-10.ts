import { runWithInputFile } from "../util";

export type Instruction = ["noop"] | ["addx", number];
export type Input = Instruction[];

function parseInput(input: string): Input {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [type, insParam] = line.split(" ");
      if (type === "noop") {
        return ["noop"];
      } else if (type === "addx") {
        return ["addx", Number(insParam)];
      } else {
        throw new Error(`unknown instruction: ${line}`);
      }
    });
}

export function solve1(instructions: Input): number {
  let register = 1;
  let cycles: number[] = [register];

  instructions.forEach(([type, param]) => {
    if (type === "noop") {
      cycles.push(register);
    } else if (type === "addx") {
      cycles.push(register);
      register += param;
      cycles.push(register);
    }
  });

  const score =
    20 * cycles[19] +
    60 * cycles[59] +
    100 * cycles[99] +
    140 * cycles[139] +
    180 * cycles[179] +
    220 * cycles[219];

  return score;
}

export function solve2(instructions: Input): string {
  let register = 1;
  let cycles: number[] = [register];

  instructions.forEach(([type, param]) => {
    if (type === "noop") {
      cycles.push(register);
    } else if (type === "addx") {
      cycles.push(register);
      register += param;
      cycles.push(register);
    }
  });

  let str = "";

  for (let i = 0; i < cycles.length - 1; i++) {
    if (i % 40 === 0) {
      str += "\n";
    }

    if (i % 40 >= cycles[i] - 1 && i % 40 <= cycles[i] + 1) {
      str += "#";
    } else {
      str += ".";
    }
  }

  return str;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2022/day-10");
