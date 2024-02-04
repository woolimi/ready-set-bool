export const boolToStr = (bool: boolean): string => {
  return bool ? "1" : "0";
};

export const max = (a: number, b: number) => (a > b ? a : b);
export const min = (a: number, b: number) => (a < b ? a : b);
