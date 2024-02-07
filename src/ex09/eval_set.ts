import { ASTSet } from "../AbstractSyntaxTree";

export const eval_set = (formula: string, sets: Array<Array<number>>): Array<number> | undefined => {
  const tree = new ASTSet(formula, sets);

  return tree.compute();
};
