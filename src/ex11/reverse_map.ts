import { isNil } from "@fxts/core";

export const reverse_map = (n: number): Record<number, number> | undefined => {
  if (isNil(n) || n < 0 || n > 1) {
    return undefined;
  }

  try {
    const max = 2n ** 32n - 1n;
    const value = n * parseFloat(max.toString());
    const x = parseInt(BigInt.asUintN(16, BigInt(value >> 16)).toString());
    const y = parseInt(BigInt.asUintN(16, BigInt(value & 0xffff)).toString());
    return [x, y];
  } catch (error: any) {
    console.log(error.message || error);
    return undefined;
  }
};
