import { multiplier } from "./multiplier";
import { green, red, yellow } from "console-log-colors";

const calc = (a: number, b: number) => {
  const original = a * b;
  const myFunction = multiplier(a, b);

  console.log(yellow(`==============================`));
  console.log(`Original  : ${a} * ${b} = ${original}`);
  console.log(`MyFunction: ${a} * ${b} = ${myFunction}`);
  console.log("Is equal?", original === myFunction ? green("OK") : red("KO"));
};

calc(3, 13);
calc(13, 23);
calc(23, -33);
