export const map = (x: number, y: number): number => {
  const u_short_x = BigInt.asUintN(16, BigInt(x));
  const u_short_y = BigInt.asUintN(16, BigInt(y));
  const value = (u_short_x * 2n ** 16n) | u_short_y;
  const max = 2n ** 32n - 1n;

  return parseFloat(value.toString()) / parseFloat(max.toString());
};
