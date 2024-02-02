import { adder } from "../ex00/adder";

export const multiplier = (a: number, b: number): number => {
  let sum = 0;

  while (b != 0) {
    if (b & 1) {
      sum = adder(a, sum);
    }
    a = a << 1;
    b = b >> 1;
  }
  return sum;
};
