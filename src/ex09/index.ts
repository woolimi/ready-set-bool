import { yellow, green, red } from "console-log-colors";
import { eval_set } from "./eval_set";

const calc = (formula: string, sets: Array<Array<number>>, expected: Array<number>) => {
  console.log(yellow(`==============================`));
  const res = eval_set(formula, sets);
  console.log("Input   : ", `"${formula}"`, ...sets);
  console.log("Output  : ", res);
  console.log("Expected: ", expected);

  console.log("Result: ", JSON.stringify(expected) === JSON.stringify(res) ? green("OK") : red("KO"));
};

calc("A", [[]], []);
calc("A!", [[]], []);
calc("A", [[42]], [42]);
calc("A!", [[42]], []);

calc(
  "A!B&",
  [
    [1, 2, 3],
    [2, 3, 4],
  ],
  [4],
);
calc("AB|", [[0, 1, 2], []], [0, 1, 2]);
calc("AB&", [[0, 1, 2], []], []);
calc("AB&", [[0, 1, 2], [0]], [0]);
calc("AB&", [[0, 1, 2], [42]], []);
calc("AB^", [[0, 1, 2], [0]], [1, 2]);
calc("AB>", [[0], [1, 2]], [1, 2]);
calc("AB>", [[0], [0, 1, 2]], [0, 1, 2]);

calc("ABC||", [[], [], []], []);
calc("ABC||", [[0], [1], [2]], [0, 1, 2]);
calc("ABC||", [[0], [0], [0]], [0]);
calc("ABC&&", [[0], [0], []], []);
calc("ABC&&", [[0], [0], [0]], [0]);
calc("ABC^^", [[0], [0], [0]], [0]);
calc("ABC>>", [[0], [0], [0]], [0]);
