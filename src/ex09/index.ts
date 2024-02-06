import { yellow } from "console-log-colors";
import { eval_set } from "./eval_set";

const calc = (formula: string, sets: Array<Array<number>>) => {
  console.log(yellow(`==============================`));
  console.log(eval_set(formula, sets));
};

// calc("AB&", [
//   [0, 1, 2],
//   [0, 3, 4],
// ]);

// calc("AB|", [
//   [0, 1, 2],
//   [3, 4, 5],
// ]);

calc("A", [[]]);
calc("A!", [[]]);
calc("A", [[42]]);
calc("A!", [[42]]);
calc("A!", [[], [42]]);
