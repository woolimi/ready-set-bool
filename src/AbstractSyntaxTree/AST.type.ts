export type AstOperators<T> = {
  [key: string]: Function;
};
export type AstOperands<T> = {
  [key: string]: T;
};

export type AstVariables<T> = Map<string, T | undefined>;
