import { yellow } from "console-log-colors";
import { map } from "./map";

const calc = (a: number, b: number) => {
  console.log(yellow(`==============================`));
  console.log(map(a, b));
};

calc(0, 0);
calc(0, 1);
calc(1, 2);
calc(100, 100);
calc((1 << 16) - 1, (1 << 16) - 1);
