import { adder } from "./adder";
import { green, red, yellow } from "console-log-colors";

const calc = (a: number, b: number) => {
  const original = a + b;
  const myFunction = adder(a, b);

  console.log(yellow(`==============================`));
  console.log(`Original  : ${a} + ${b} = ${original}`);
  console.log(`MyFunction: ${a} + ${b} = ${myFunction}`);
  console.log("Is equal?", original === myFunction ? green("OK") : red("KO"));
};

calc(1, 1);
calc(123, 38927);
calc(0, 0);
calc(1, 0);
calc(0, 1);
calc(1, 1);
calc(1, 2);
calc(2, 2);
