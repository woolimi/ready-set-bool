import { AST } from "./AST.class";
import { nnf } from "./AST.nnf";

export const cnf = (tree: AST): AST => {
  if (!tree.root) return tree;

  nnf(tree);

  return tree;
};
