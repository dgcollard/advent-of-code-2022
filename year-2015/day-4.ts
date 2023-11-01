import crypto from "crypto";
import { run } from "../util";

export function solve1(input: string): number {
  for (let i = 1; ; i++) {
    const str = `${input}${i}`;
    const md5 = crypto.createHash("md5").update(str);
    const hash = md5.digest("hex");

    if (hash.slice(0, 5) === "00000") {
      return i;
    }
  }
}

export function solve2(input: string): number {
  for (let i = 1; ; i++) {
    const str = `${input}${i}`;
    const md5 = crypto.createHash("md5").update(str);
    const hash = md5.digest("hex");

    if (hash.slice(0, 6) === "000000") {
      return i;
    }
  }
}

function main() {
  const input = "yzbqklnj";
  console.log(solve1(input));
  console.log(solve2(input));
}

run(main);
