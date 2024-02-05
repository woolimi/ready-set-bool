import { AST, type Node, type AstVariables } from "./AST.class";
import { isNil } from "@fxts/core";

const _compute = (node: Node, variables: AstVariables): boolean => {
  if (node.type === "variable") {
    if (isNil(variables.get(node.token)))
      throw new Error(`[AST compute error]: Cannot calculate variable ${node.token}`);

    return variables.get(node.token) as boolean;
  }

  if (node.type === "operand") {
    return AST.operands[node.token];
  }

  const f = AST.operators[node.token];
  return AST.isBinaryOperator(node.token)
    ? f(_compute(node.left as Node, variables))
    : f(_compute(node.left as Node, variables), _compute(node.right as Node, variables));
};

export const compute = (tree: AST): boolean | undefined => {
  if (!tree.root) {
    return undefined;
  }
  return _compute(tree.root, tree.variables);
};
