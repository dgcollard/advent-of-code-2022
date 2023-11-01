import { product, runWithInputFile } from "../util";

type MonkeyState = {
  items: number[];
  operation: (old: number) => number;
  worryLevelDivisibleBy: number;
  trueThrowsToMonkey: number;
  falseThrowsToMonkey: number;
  inspections: number;
};

function parseInput(input: string): MonkeyState[] {
  return input
    .trim()
    .split("\n\n")
    .map((section, i) => {
      const lines = section.split("\n");
      const items = lines[1].substring(18).split(", ").map(Number);

      const op = lines[2].substring(19);
      const operation =
        op === "old * old"
          ? function sq(old: number) {
              return old * old;
            }
          : op.charAt(4) === "+"
          ? function add(old: number) {
              return old + Number(op.substring(6));
            }
          : op.charAt(4) === "*"
          ? function mul(old: number) {
              return old * Number(op.substring(6));
            }
          : null;
      if (!operation) throw new Error();

      const worryLevelDivisibleBy = Number(lines[3].substring(21));
      const trueThrowsToMonkey = Number(lines[4].substring(29));
      const falseThrowsToMonkey = Number(lines[5].substring(30));

      return {
        items,
        operation,
        worryLevelDivisibleBy,
        trueThrowsToMonkey,
        falseThrowsToMonkey,
        inspections: 0,
      };
    });
}

export function solve1(monkeys: MonkeyState[]): number {
  for (let i = 0; i < 20; i++) {
    for (let m = 0; m < monkeys.length; m++) {
      monkeys[m].inspections += monkeys[m].items.length;

      while (monkeys[m].items.length) {
        let item = monkeys[m].items.pop()!;
        item = Math.trunc(monkeys[m].operation(item) / 3);
        if (item % monkeys[m].worryLevelDivisibleBy === 0) {
          monkeys[monkeys[m].trueThrowsToMonkey].items.push(item);
        } else {
          monkeys[monkeys[m].falseThrowsToMonkey].items.push(item);
        }
      }
    }
  }

  // sort monkeys by number of inspectons descending
  monkeys.sort((a, b) => b.inspections - a.inspections);

  return monkeys[0].inspections * monkeys[1].inspections;
}

export function solve2(monkeys: MonkeyState[]): number {
  // this could be LCM, but product of the worry level divisors works too
  const div = product(
    monkeys.map(({ worryLevelDivisibleBy }) => worryLevelDivisibleBy)
  );

  for (let i = 0; i < 10000; i++) {
    for (let m = 0; m < monkeys.length; m++) {
      monkeys[m].inspections += monkeys[m].items.length;

      while (monkeys[m].items.length) {
        let item = monkeys[m].items.pop()!;

        // calculate new worry level mod product of all the worry level factors,
        // because it keeps the numbers lower and doesn't affect divisibility
        item = monkeys[m].operation(item) % div;
        if (item % monkeys[m].worryLevelDivisibleBy === 0) {
          monkeys[monkeys[m].trueThrowsToMonkey].items.push(item);
        } else {
          monkeys[monkeys[m].falseThrowsToMonkey].items.push(item);
        }
      }
    }
  }

  // sort monkeys by number of inspectons descending
  monkeys.sort((a, b) => b.inspections - a.inspections);

  return monkeys[0].inspections * monkeys[1].inspections;
}

function main(input: string) {
  const parsedInput1 = parseInput(input);
  console.log(solve1(parsedInput1));

  const parsedInput2 = parseInput(input);
  console.log(solve2(parsedInput2));
}

runWithInputFile(main, "year-2022/day-11");
