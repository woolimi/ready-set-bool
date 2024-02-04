import { AST } from "../utils/AST.class";

export const negation_normal_form = (formula: string): string => {
  const tree = new AST(formula).parse();

  return "";
};
