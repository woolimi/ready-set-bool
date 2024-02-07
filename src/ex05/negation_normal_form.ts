import { ASTBool, treeToFormula, nnf } from "../AbstractSyntaxTree";
import { pipe } from "@fxts/core";

export const negation_normal_form = (formula: string): string => {
  const tree = new ASTBool(formula);

  return pipe(tree, nnf, treeToFormula);
};
