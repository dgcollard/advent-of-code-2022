import { runWithInputFile } from "../util";

function parseInput(input: string): string[] {
  return input.trim().split("\n");
}

function calculateDirSizes(input: string[]): { [dirPath: string]: number } {
  const dirSizes: { [dirPath: string]: number } = {};
  const currentPath: string[] = ["root"];

  input.forEach((line) => {
    if (line === "$ cd /") {
      currentPath.length = 1;
    } else if (line === "$ cd ..") {
      currentPath.pop();
    } else if (line.indexOf("$ cd ") === 0) {
      currentPath.push(line.slice(5));
    } else if (line === "$ ls") {
      // do nothing
    } else if (line.indexOf("dir ") === 0) {
      // do nothing
    } else {
      // only left with a file size
      // add the file size to current path dir size and all parents

      const size = line.split(" ")[0];

      for (let i = 1; i <= currentPath.length; i++) {
        const d = currentPath.slice(0, i).join("/");
        dirSizes[d] ??= 0;
        dirSizes[d] += Number(size);
      }
    }
  });

  return dirSizes;
}

export function solve1(input: string[]): number {
  const dirSizes = calculateDirSizes(input);

  // sum of all sizes less than 100000
  return Object.values(dirSizes).reduce((t, v) => t + (v < 100000 ? v : 0), 0);
}

export function solve2(input: string[]): number {
  const dirSizes = calculateDirSizes(input);

  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const availableSpace = totalSpace - dirSizes["root"];
  const needSpace = requiredSpace - availableSpace;

  // find smallest dir size equal to or larger than needSpace
  return Object.values(dirSizes).reduce(
    (t, v) => (v < t && v >= needSpace ? v : t),
    dirSizes["root"]
  );
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "year-2022/day-7");
