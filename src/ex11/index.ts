import { yellow } from "console-log-colors";
import { map } from "../ex10/map";
import { reverse_map } from "./reverse_map";

const calc = (f: Function) => {
  console.log(yellow(`==============================`));
  const input = f();
  console.log("Input : ", input);
  console.log("Output: ", reverse_map(input));
};

calc(() => map(1, 2));
calc(() => map(9999, 9999));
calc(() => map((1 << 16) - 1, (1 << 16) - 1));
calc(() => map(0, 0));
calc(() => map(0.2, 32));
calc(() => map(2, 32));
