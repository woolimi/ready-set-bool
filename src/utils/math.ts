export const square = (a: number): number => {
  return a << 1;
};

export const nSquare = (a: number, iterations: number): number => {
  if (iterations === 0) {
    return a;
  }
  return nSquare(square(a), iterations - 1);
};
