import { yellow } from "console-log-colors";
import { powerset } from "./powerset";

const calc = (set: Array<number>) => {
  console.log(yellow(`==============================`));
  console.log(powerset(set));
};

calc([]);
calc([0]);
calc([0, 1]);
calc([0, 1, 2]);
