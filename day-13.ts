import { runWithInputFile } from "./util";

type Nested<T> = T | _Nested<T>;
interface _Nested<T> extends Array<_Nested<T> | T> {}

type Input = [Nested<number>, Nested<number>][];

function parseInput(input: string): Input {
  return input
    .trim()
    .split("\n\n")
    .map((linePair) =>
      linePair.split("\n").map((line) => JSON.parse(line))
    ) as Input;
}

export function compare(
  a: Nested<number>,
  b: Nested<number>
): boolean | undefined {
  if (typeof a === "number" && typeof b === "number") {
    return a < b ? true : a > b ? false : undefined;
  } else if (!Array.isArray(a)) {
    return compare([a], b);
  } else if (!Array.isArray(b)) {
    return compare(a, [b]);
  }

  for (let i = 0; i < a.length || i < b.length; i++) {
    if (a[i] === undefined) return true;
    if (b[i] === undefined) return false;

    const c = compare(a[i], b[i]);
    if (c !== undefined) return c;
  }
}

export function solve1(packetPairs: Input): number {
  return packetPairs.reduce((t, [a, b], i) => {
    return compare(a, b) ? t + i + 1 : t;
  }, 0);
}

export function solve2(packetPairs: Input): number {
  const packets = packetPairs.flat().concat([[[2]], [[6]]]);
  const packetIndexes = Object.keys(packets).map(Number);

  const compareFn = (ai: number, bi: number) => {
    return compare(packets[ai], packets[bi]) ? -1 : 1;
  };

  packetIndexes.sort(compareFn);

  const twoPacketIndex = packetIndexes.indexOf(packets.length - 2) + 1;
  const sixPacketIndex = packetIndexes.indexOf(packets.length - 1) + 1;

  return twoPacketIndex * sixPacketIndex;
}

function main(input: string) {
  const parsedInput = parseInput(input);

  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "day-13");
