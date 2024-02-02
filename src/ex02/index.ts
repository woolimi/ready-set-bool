import { gray_code } from "./gray_code";
import { yellow } from "console-log-colors";

const calc = (a: number) => {
  const original = a;
  const encoded = gray_code(a);

  console.log(yellow(`==============================`));
  console.log(`Input : ${original}`, `Output: ${encoded}`);
};

calc(0);
calc(1);
calc(2);
calc(3);
calc(4);
calc(5);
calc(6);
calc(7);
calc(8);
