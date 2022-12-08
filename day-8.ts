import { product, runWithInputFile } from "./util";

function parseInput(input: string): number[][] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));
}

export function solve1(forest: number[][]): number {
  let visibleScore = 0;

  for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
      const aspects = [
        // left
        forest[y].slice(0, x),
        // right
        forest[y].slice(x + 1),
        // up
        forest.slice(0, y).map((row) => row[x]),
        // down
        forest.slice(y + 1).map((row) => row[x]),
      ];

      if (
        aspects.find((aspect) => aspect.every((tree) => tree < forest[y][x]))
      ) {
        visibleScore++;
      }
    }
  }

  return visibleScore;
}

export function solve2(forest: number[][]): number {
  let bestScenicScore = 0;

  for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
      // trees in row or column seen away from current tree
      const aspects = [
        // going left
        forest[y].slice(0, x).reverse(),
        // going right
        forest[y].slice(x + 1),
        // going up
        forest
          .slice(0, y)
          .map((row) => row[x])
          .reverse(),
        // going down
        forest.slice(y + 1).map((row) => row[x]),
      ];

      const aspectLengths = aspects.map((aspect) => {
        // find first tree in line that is >= this tree
        const index = aspect.findIndex((tree) => tree >= forest[y][x]);
        // if no blocking tree is found, use length to the edge
        return index === -1 ? aspect.length : index + 1;
      });

      const scenicScore = product(aspectLengths);
      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
      }
    }
  }

  return bestScenicScore;
}

function main(input: string) {
  const parsedInput = parseInput(input);
  console.log(solve1(parsedInput));
  console.log(solve2(parsedInput));
}

runWithInputFile(main, "day-8");
