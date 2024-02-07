/**
 * 1. XOR do add without considering carry bits
 * ex) 1 ^ 0 = 1
 *     1 ^ 1 = 0
 *     0 ^ 0 = 0
 * 2. do AND and shift to add carry bits
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

export const adder = (a: number, b: number): number => {
  if (b == 0) return a;

  const sum = a ^ b;
  const carry = (a & b) << 1;
  return adder(sum, carry);
};
