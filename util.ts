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
