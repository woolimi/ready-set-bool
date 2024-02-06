import { treeToFormula } from ".";
import { AST, Node } from "./AST.class";
import { makeTruthTable } from "./AST.printTruthTable";
import { pipe } from "@fxts/core";
import { cloneDeep } from "lodash-es";

// https://www.youtube.com/watch?v=2cgHa02s_SA
// 1. make a truth table
// 2. make a DNF for F = 0
//    (¬A ∧ B) ∨ (A ∧ B)
//     A! B & A B & |
// 3. negate the DNF
//    (A ∨ ¬B) ∧ (¬A ∨ B)
//     A B! | A! B | &

const makeDNF = (tree: AST, table: boolean[][]): AST => {
  table = [...table.filter((r) => !r[r.length - 1])];
  const variables = [...tree.variables];
  const dnf = [];

  // Play with F = 0
  for (let rowIdx = 0; rowIdx < table.length; rowIdx++) {
    const row = table[rowIdx];
    let txt = "";
    for (let i = 0; i < row.length - 1; i++) {
      txt += variables[i][0] + (row[i] ? "" : "!");
    }
    txt += "&".repeat(variables.length - 1);
    dnf.push(txt);
  }
  const newFormula = dnf.join("") + "|".repeat(table.length - 1);

  return new AST(newFormula);
};

const negate = (node: Node) => {
  if (!node) return;
  if (["&", "|"].includes(node.token)) {
    node.token = node.token === "&" ? "|" : "&";
    negate(node.left as Node);
    negate(node.right as Node);
  }
  if (node.token === "!") {
    const A = node.left;
    node.token = A?.token as string;
    node.left = A?.left;
    node.right = A?.right;
    negate(node.left as Node);
  }
  if (node.type === "variable") {
    const A = new Node(node.token, "variable");
    node.token = "!";
    node.type = "operator";
    node.left = A;
  }
};

export const cnf = (tree: AST): AST => {
  if (!tree.root) return tree;

  const table = makeTruthTable(tree);
  const newTree = makeDNF(tree, table);

  if (!newTree.root) return tree;
  negate(newTree.root);

  return newTree;
};
