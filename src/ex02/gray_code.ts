export const gray_code = (n: number): number => {
  return n ^ (n >> 1);
};
