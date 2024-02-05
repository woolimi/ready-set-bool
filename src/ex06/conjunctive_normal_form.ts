import { AST, treeToFormula, cnf } from "../AbstractSyntaxTree";
import { pipe } from "@fxts/core";

export const conjunctive_normal_form = (formula: string): string => {
  const tree = new AST(formula);

  return pipe(tree, cnf, treeToFormula);
};
