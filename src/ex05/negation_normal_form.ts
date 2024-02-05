import { AST, treeToFormula, nnf } from "../AbstractSyntaxTree";
import { pipe } from "@fxts/core";

export const negation_normal_form = (formula: string): string => {
  const tree = new AST(formula);

  return pipe(tree, nnf, treeToFormula);
};
