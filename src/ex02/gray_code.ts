// https://www.youtube.com/watch?v=s5gJpF8EKP8

import { adder } from "../ex00/adder";
import { multiplier } from "../ex01/multiplier";

export const gray_code = (n: number): number => {
  let sum = 0;
  let digit = 1;

  while (n != 0) {
    const b0 = n & 1; // get binary number of 1st pos
    const b1 = (n & 2) >> 1; // get binary number of 2nd pos
    const xor = b1 ^ b0;

    sum = adder(sum, multiplier(digit, xor));
    digit = digit << 1;
    n = n >> 1;
  }
  return sum;
};
