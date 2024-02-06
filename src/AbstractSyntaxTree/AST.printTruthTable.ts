import { pipe, range, map, join, toArray, reverse, isUndefined } from "@fxts/core";
import { AST } from "./AST.class";
import { compute } from "./AST.compute";

const boolToNum = (bool: boolean): number => {
  return bool ? 1 : 0;
};

const printHeader = (tree: AST) => {
  const header = pipe(
    [...tree.variables, ["=", undefined]],
    map(([k, _]) => k),
    join(" | "),
    (str) => `| ${str} |`,
  );
  console.log(header);
};

const printDivider = (tree: AST) => {
  const divider = pipe(
    range(tree.variables.size + 1),
    map(() => "---"),
    join("|"),
    (str) => `|${str}|`,
  );
  console.log(divider);
};

export const makeTruthTable = (tree: AST): boolean[][] => {
  const variables = tree.variables;
  const nbVars = variables.size;
  const nbTotalCase = 2 ** nbVars;
  const maxNum = nbTotalCase - 1;
  const variableArray = pipe(
    variables,
    map(([k, _]) => k),
    reverse,
    toArray,
  );
  const result: boolean[][] = [];
  for (let testCase = 0; testCase < nbTotalCase; testCase++) {
    let flags = maxNum & testCase;
    for (let i = 0; i < nbVars; i++) {
      const key = variableArray[i][0];
      variables.set(key, !!(flags & 1));
      flags = flags >> 1;
    }
    const row = pipe(
      variables,
      map(([_, v]) => !!v),
      toArray,
    );
    result.push([...row, !!compute(tree)]);
  }
  return result;
};

const printBody = (tree: AST) => {
  const table = makeTruthTable(tree);

  for (const row of table) {
    console.log(`| ${row.map((r) => boolToNum(r)).join(" | ")} |`);
  }
};

export const printTruthTable = (tree: AST) => {
  if (!tree.root) return;

  printHeader(tree);
  printDivider(tree);
  printBody(tree);
};
