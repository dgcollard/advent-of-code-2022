import fs from "fs";
import path from "path";

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function sum(numbers: number[]): number {
  return numbers.reduce(add, 0);
}

export function product(numbers: number[]): number {
  return numbers.reduce(multiply, 1);
}

export function runWithInputFile(
  main: (input: string) => void,
  inputFile: string
): void {
  if (process.env.TEST) return;

  const input = fs.readFileSync(
    path.join(__dirname, `${inputFile}.input.txt`),
    {
      encoding: "utf-8",
    }
  );

  main(input);
}
