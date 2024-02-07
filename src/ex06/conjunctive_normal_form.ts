import { ASTBool, cnf, treeToFormula } from "../AbstractSyntaxTree";
import { pipe } from "@fxts/core";

export const conjunctive_normal_form = (formula: string): string => {
  const tree = new ASTBool(formula);

  return pipe(tree, cnf, treeToFormula);
};
