import { AST, Node } from "./AST.class";
import { cloneDeep } from "lodash-es";

const applyMaterialCondition = (node: Node) => {
  // Change "AB>" to "!AB|"
  if (node.token === ">") {
    node.token = "|";
    const nodeLeft = node.left;
    const notOperator = new Node("!", "operator");
    node.left = notOperator;
    notOperator.left = nodeLeft;
  }
  if (node.right) {
    applyMaterialCondition(node.right);
  }
  if (node.left) {
    applyMaterialCondition(node.left);
  }
};

const applyEliminateXor = (node: Node) => {
  if (node.token === "^") {
    node.token = "|";
    const A = node.left as Node;
    const B = node.right as Node;
    node.left = new Node("&", "operator");
    node.right = new Node("&", "operator");

    node.left.left = new Node("!", "operator");
    node.left.left.left = cloneDeep(A);
    node.left.right = cloneDeep(B);

    node.right.left = cloneDeep(A);
    node.right.right = new Node("!", "operator");
    node.right.right.left = cloneDeep(B);
  }
  if (node.right) {
    applyEliminateXor(node.right);
  }
  if (node.left) {
    applyEliminateXor(node.left);
  }
};

const applyEquivalence = (node: Node) => {
  // change "AB=" to "AB&A!B!&|"

  if (node.token === "=") {
    node.token = "|";
    const A = node.left;
    const B = node.right;
    node.left = new Node("&", "operator");
    node.right = new Node("&", "operator");

    node.left.left = A;
    node.left.right = B;

    node.right.left = new Node("!", "operator");
    node.right.right = new Node("!", "operator");

    node.right.left.left = cloneDeep(A);
    node.right.right.left = cloneDeep(B);
  }
  if (node.right) {
    applyEquivalence(node.right);
  }
  if (node.left) {
    applyEquivalence(node.left);
  }
};

const applyDemorgan = (node: Node) => {
  if (node.token === "!" && ["&", "|"].includes(node.left?.token as string)) {
    node.token = node.left?.token === "&" ? "|" : "&";

    const A = node.left?.left;
    const B = node.left?.right;

    delete node.left;
    node.left = new Node("!", "operator");
    node.right = new Node("!", "operator");
    node.left.left = A;
    node.right.left = B;
  }
  if (node.right) {
    applyDemorgan(node.right);
  }
  if (node.left) {
    applyDemorgan(node.left);
  }
};

const applyDoubleNegationElimination = (node: Node) => {
  if (node.token === "!" && node.left?.token === "!") {
    if (!node.left.left) throw new Error("[AST nnf error]: Invalid Double negation form");
    const A = node.left.left;

    delete node.left;
    node.token = A.token;
    node.left = A.left;
    node.right = A.right;
  }
  if (node.right) {
    applyDoubleNegationElimination(node.right);
  }
  if (node.left) {
    applyDoubleNegationElimination(node.left);
  }
};

export const nnf = (tree: AST): AST => {
  if (!tree.root) return tree;

  applyMaterialCondition(tree.root);
  applyEliminateXor(tree.root);
  applyEquivalence(tree.root);
  applyDemorgan(tree.root);
  applyDoubleNegationElimination(tree.root);
  return tree;
};
