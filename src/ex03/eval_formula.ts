import { AST, compute } from "../AbstractSyntaxTree";

export const eval_formula = (formula: string): boolean | undefined => {
  try {
    const tree = new AST(formula);

    return compute(tree);
  } catch (error: any) {
    console.log(error?.message || error);
    return false;
  }
};
