import { yellow } from "console-log-colors";
import { eval_set } from "./eval_set";

const calc = (formula: string, sets: Array<Array<number>>) => {
  console.log(yellow(`==============================`));
  console.log("Input : ", `"${formula}"`, ...sets);
  console.log("Output: ", eval_set(formula, sets));
};

// calc("A", [[]]);
// calc("A!", [[]]);
// calc("A", [[42]]);
// calc("A!", [[42]]);
// calc("A!", [[], [42]]);
// calc("AB|", [[0, 1, 2], []]);
// calc("AB&", [[0, 1, 2], []]);
// calc("AB&", [[0, 1, 2], [0]]);
// calc("AB&", [[0, 1, 2], [42]]);
// calc("AB^", [[0, 1, 2], [0]]);
// calc("AB>", [[0], [1, 2]]);
// calc("AB>", [[0], [0, 1, 2]]);

calc("ABC||", [[], [], []]);
calc("ABC||", [[0], [1], [2]]);
calc("ABC||", [[0], [0], [0]]);
calc("ABC&&", [[0], [0], []]);
calc("ABC&&", [[0], [0], [0]]);
calc("ABC^^", [[0], [0], [0]]);
calc("ABC>>", [[0], [0], [0]]);
