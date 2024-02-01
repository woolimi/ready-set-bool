export const adder = (a: number, b: number): number => {
  if (b === 0) return a;

  // 1. XOR do add without considering carry bits
  // ex) 1 ^ 0 = 1
  //     1 ^ 1 = 0
  //     0 ^ 0 = 0
  const sum = a ^ b;
  // 2. AND and shift
  const carry = (a & b) << 1;
  return adder(sum, carry);
};
