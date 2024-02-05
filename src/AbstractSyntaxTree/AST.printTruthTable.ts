import { pipe, range, map, join, toArray, reverse } from "@fxts/core";
import { AST } from "./AST.class";
import { compute } from "./AST.compute";

const boolToStr = (bool: boolean): string => {
  return bool ? "1" : "0";
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

const printBody = (tree: AST) => {
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

  for (let testCase = 0; testCase < nbTotalCase; testCase++) {
    let flags = maxNum & testCase;
    for (let i = 0; i < nbVars; i++) {
      const key = variableArray[i][0];
      variables.set(key, !!(flags & 1));
      flags = flags >> 1;
    }
    const row = pipe(
      variables,
      map(([_, v]) => boolToStr(!!v)),
      toArray,
    );
    console.log(`| ${[...row, boolToStr(!!compute(tree))].join(" | ")} |`);
  }
};

export const printTruthTable = (tree: AST) => {
  printHeader(tree);
  printDivider(tree);
  printBody(tree);
};
