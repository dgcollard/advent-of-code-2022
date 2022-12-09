import { runWithInputFile } from "./util";

export type Input = [string, number][];

function parseInput(input: string): Input {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .map(([dir, len]) => [dir, Number(len)]);
}

export function solve1(instructions: Input): number {
  const tailVisited: Record<string, boolean> = {};

  let [hx, hy, tx, ty] = [0, 0, 0, 0];

  instructions.forEach(([dir, num]) => {
    for (let i = 0; i < num; i++) {
      // calculate new position of head
      if (dir === "R") {
        hx++;
      } else if (dir === "L") {
        hx--;
      } else if (dir === "U") {
        hy++;
      } else if (dir === "D") {
        hy--;
      }

      // calculate new position of tail
      if (tx === hx - 2) {
        tx++;
        ty = hy;
      }
      if (tx === hx + 2) {
        tx--;
        ty = hy;
      }
      if (ty === hy - 2) {
        ty++;
        tx = hx;
      }
      if (ty === hy + 2) {
        ty--;
        tx = hx;
      }
      tailVisited[`${tx},${ty}`] = true;
    }
  });

  return Object.keys(tailVisited).length;
}

export function solve2(instructions: Input): number {
  const tailVisited: Record<string, boolean> = {};

  const positions: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    positions[i] = [0, 0];
  }

  instructions.forEach(([dir, num]) => {
    for (let i = 0; i < num; i++) {
      // calculate new position of head
      if (dir === "R") {
        positions[0][0]++;
      } else if (dir === "L") {
        positions[0][0]--;
      } else if (dir === "U") {
        positions[0][1]++;
      } else if (dir === "D") {
        positions[0][1]--;
      }

      // calculate new position of each segment in the rest of the rope
      for (let b = 1; b < positions.length; b++) {
        const [ax, ay] = positions[b - 1];
        const [bx, by] = positions[b];

        if (Math.hypot(ax - bx, ay - by) > 2) {
          // diagonal move
          positions[b][0] += Math.sign(ax - bx);
          positions[b][1] += Math.sign(ay - by);
        } else if (Math.abs(ax - bx) > 1) {
          // horizontal move
          positions[b][0] += Math.sign(ax - bx);
        } else if (Math.abs(ay - by) > 1) {
          // vertical move
          positions[b][1] += Math.sign(ay - by);
        }
      }

      const [tx, ty] = positions.at(-1)!;
      tailVisited[`${tx},${ty}`] = true;
    }
  });

  return Object.keys(tailVisited).length;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "day-9");
