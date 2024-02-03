import { AST } from "../utils/AST.class";

export const eval_formula = (formula: string): boolean | undefined => {
  try {
    const tree = new AST(formula);
    return tree.parse().compute();
  } catch (error) {
    console.log(error);
    return false;
  }
};
