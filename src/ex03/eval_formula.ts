import { ASTBool } from "../AbstractSyntaxTree";

export const eval_formula = (formula: string): boolean | undefined => {
  try {
    const tree = new ASTBool(formula);

    return tree.compute();
  } catch (error: any) {
    console.log(error?.message || error);
    return false;
  }
};
