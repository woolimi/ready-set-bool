// https://www.youtube.com/watch?v=s5gJpF8EKP8

export const gray_code = (n: number): number => {
  return n ^ (n >> 1);
};
