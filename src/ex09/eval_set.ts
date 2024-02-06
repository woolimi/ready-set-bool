import { AST, compute } from "../AbstractSyntaxTree";

export const eval_set = (formula: string, sets: Array<Array<number>>): Array<number> => {
  const tree = new AST(formula);
  AST.operators = {
    "&": (a: Array<number>, b: Array<number>) => {
      const setA = new Set(a);
      const setB = new Set(b);

      return [...setA].filter((x) => setB.has(x));
    },
    "|": (a: Array<number>, b: Array<number>) => {
      const setC = new Set([...a, ...b]);

      return [...setC];
    },
    "^": (a: Array<number>, b: Array<number>) => {
      const setA = new Set(a);
      const setB = new Set(b);
      const onlyA = [...setA].filter((x) => !setB.has(x));
      const onlyB = [...setB].filter((x) => !setA.has(x));

      return [...onlyA, ...onlyB];
    },
    "=": (a: Array<number>, b: Array<number>) => {
      const setA = new Set(a);
      const setB = new Set(b);
      return setA.size === setB.size && [...setA].every((x) => setB.has(x));
    },
    ">": (a: Array<number>, b: Array<number>) => {
      const setA = new Set(a);
      const setB = new Set(b);

      return [...setB];
    },
    "!": (a: Array<number>) => {
      const setA = new Set(a);
      const global = tree.variables.get("Global") || [];
      return global.filter((e) => !setA.has(e));
    },
  };
  const variablesArr = [...tree.variables];

  sets.forEach((set, idx) => {
    if (variablesArr[idx]) {
      variablesArr[idx][1] = set;
    } else {
      variablesArr.push(["Global", set]);
    }
  });

  tree.variables = new Map(variablesArr);

  return compute(tree);
};
