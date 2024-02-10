import { ASTSet } from "../AbstractSyntaxTree";

export const eval_set = (formula: string, sets: Array<Array<number>>): Array<number> | undefined => {
  try {
    const tree = new ASTSet(formula, sets);

    return tree.compute();
  } catch (error: any) {
    console.error(error.message || error);
    return undefined;
  }
};
