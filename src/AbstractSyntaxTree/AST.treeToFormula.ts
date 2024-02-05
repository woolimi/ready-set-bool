import { AST, type Node } from "./AST.class";

const _treeToFormula = (stack: string[], node: Node) => {
  stack.push(node.token);
  if (node.right) _treeToFormula(stack, node.right);
  if (node.left) _treeToFormula(stack, node.left);
};

export const treeToFormula = (tree: AST): string => {
  if (!tree.root) return "";
  const stack: string[] = [];

  _treeToFormula(stack, tree.root);
  return stack.reverse().join("");
};
