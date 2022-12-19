import { runWithInputFile } from "./util";

type Input = [number, number, number, number][];

function parseInput(input: string): Input {
  const split = (sep: string) => (str: string) => str.split(sep);

  return split("\n")(input.trim()).map((line) => {
    const match = line.match(
      /Sensor at x=(.*), y=(.*): closest beacon is at x=(.*), y=(.*)/
    );
    const [, sx, sy, bx, by] = match!;
    return [sx, sy, bx, by].map(Number) as [number, number, number, number];
  });
}

const taxicab = (x0: number, y0: number, x1: number, y1: number) =>
  Math.abs(x0 - x1) + Math.abs(y0 - y1);

export function solve1(sensors: Input, y: number): number {
  // x coords on the y line that are beacons
  const beacons = new Set();

  // ranges of x coords on the y line that are in range of a sensor
  const ranges: [number, number][] = [];

  // individual coords on the y line that are in range of a sensor, and not a beacon
  const range = new Set();

  sensors.forEach(([sx, sy, bx, by]) => {
    if (by === y) beacons.add(bx);

    const d = taxicab(sx, sy, bx, by);

    if (taxicab(sx, sy, sx, y) <= d) {
      const x0 = sx - d + Math.abs(sy - y);
      const x1 = sx + d - Math.abs(sy - y);

      for (let x = x0; x <= x1; x++) {
        if (!beacons.has(x)) range.add(x);
      }
    }
  });

  return Array.from(range).length;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput, 2000000));
  // console.log(solve2(parsedInput));
}

// main(`
// Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// Sensor at x=13, y=2: closest beacon is at x=15, y=3
// Sensor at x=12, y=14: closest beacon is at x=10, y=16
// Sensor at x=10, y=20: closest beacon is at x=10, y=16
// Sensor at x=14, y=17: closest beacon is at x=10, y=16
// Sensor at x=8, y=7: closest beacon is at x=2, y=10
// Sensor at x=2, y=0: closest beacon is at x=2, y=10
// Sensor at x=0, y=11: closest beacon is at x=2, y=10
// Sensor at x=20, y=14: closest beacon is at x=25, y=17
// Sensor at x=17, y=20: closest beacon is at x=21, y=22
// Sensor at x=16, y=7: closest beacon is at x=15, y=3
// Sensor at x=14, y=3: closest beacon is at x=15, y=3
// Sensor at x=20, y=1: closest beacon is at x=15, y=3
// `);

runWithInputFile(main, "day-15");
