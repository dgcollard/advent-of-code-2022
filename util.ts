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

export function reverse(str: string): string {
  let newStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str.charAt(i);
  }
  return newStr;
}

export function run(main: () => void): void {
  if (process.env.TEST) return;

  main();
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
