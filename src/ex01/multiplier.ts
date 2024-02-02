import { adder } from "../ex00/adder";

const _recur = (a: number, b: number, digit: number): number => {
  let sum = 0;

  if (b == 0) return 0;

  if (a & digit) {
    return sum + adder(_recur(a, b, digit << 1), b);
  } else {
    return 0;
  }
};

export const multiplier = (a: number, b: number): number => {
  return _recur(a, b);
};
