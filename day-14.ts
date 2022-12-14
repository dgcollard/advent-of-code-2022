import { runWithInputFile, zip } from "./util";

function parseInput(input: string): any {
  const split = (sep: string) => (str: string) => str.split(sep);

  return split("\n")(input.trim())
    .map(split(" -> "))
    .map((points) => points.map(split(",")).map((p) => p.map(Number)));
}

export function solve1(lines: [number, number][][]): number {
  // lowest point of any rock
  const lowestrocky = Math.max(
    ...lines.flatMap((line) => line.map(([_, y]) => y))
  );

  // arbitrarily big 2d array
  const grid: boolean[][] = [];
  for (let i = 0; i <= lowestrocky; i++) {
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
      grid[i][j] = false;
    }
  }

  // render rock lines into grid
  lines.forEach((line) => {
    const segs = zip(line.slice(0, -1), line.slice(1));
    segs.forEach(([[x0, y0], [x1, y1]]) => {
      if (x0 === x1) {
        for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
          grid[y][x0] = true;
        }
      } else if (y0 === y1) {
        for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
          grid[y0][x] = true;
        }
      }
    });
  });

  // point where sand enters the grid
  const enterx = 500,
    entery = 0;

  // point of current falling sand
  let sx = enterx,
    sy = entery;

  let turns = 0;
  let rest = 0;

  while (sy < lowestrocky) {
    if (!grid[sy + 1][sx]) {
      // sand falls down into empty space
      sy = sy + 1;
    } else if (!grid[sy + 1][sx - 1]) {
      // sand falls down and to the left
      sx = sx - 1;
      sy = sy + 1;
    } else if (!grid[sy + 1][sx + 1]) {
      // sand falls down and to the right
      sx = sx + 1;
      sy = sy + 1;
    } else {
      // sand comes to rest
      grid[sy][sx] = true;
      sx = enterx;
      sy = entery;
      rest++;
    }
  }

  return rest;
}

export function solve2(lines: [number, number][][]): number {
  // lowest point of any rock
  const lowestrocky = Math.max(
    ...lines.flatMap((line) => line.map(([_, y]) => y))
  );

  // arbitrarily big 2d array
  const grid: boolean[][] = [];
  for (let i = 0; i <= lowestrocky + 1; i++) {
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
      grid[i][j] = false;
    }
  }

  // render rock lines into grid
  lines.forEach((line) => {
    const segs = zip(line.slice(0, -1), line.slice(1));
    segs.forEach(([[x0, y0], [x1, y1]]) => {
      if (x0 === x1) {
        for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
          grid[y][x0] = true;
        }
      } else if (y0 === y1) {
        for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
          grid[y0][x] = true;
        }
      }
    });
  });

  // point where sand enters the grid
  const enterx = 500,
    entery = 0;

  // point of current falling sand
  let sx = enterx,
    sy = entery;

  let rest = 0;

  while (!grid[entery][enterx]) {
    if (sy <= lowestrocky && !grid[sy + 1][sx]) {
      // sand falls down into empty space
      sy = sy + 1;
    } else if (sy <= lowestrocky && !grid[sy + 1][sx - 1]) {
      // sand falls down and to the left
      sx = sx - 1;
      sy = sy + 1;
    } else if (sy <= lowestrocky && !grid[sy + 1][sx + 1]) {
      // sand falls down and to the right
      sx = sx + 1;
      sy = sy + 1;
    } else {
      // sand comes to rest
      grid[sy][sx] = true;
      sx = enterx;
      sy = entery;
      rest++;
    }
  }

  return rest;
}

function main(input: string) {
  const parsedInput = parseInput(input);

  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "day-14");
