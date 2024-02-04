import { yellow } from "console-log-colors";
import { map } from "./map";

const calc = (a: number, b: number) => {
  console.log(yellow(`==============================`));
  const output = map(a, b);
  console.log(`Input : (${a}, ${b})`);
  console.log(`Output: `, output);
};

calc(0, 0);
calc(0, 1);
calc(1, 2);
calc(100, 100);
calc((1 << 16) - 1, (1 << 16) - 1);
calc(1, 39.2);
