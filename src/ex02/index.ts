import { gray_code } from "./gray_code";
import { yellow, red, green } from "console-log-colors";

// https://www.rapidtables.com/convert/number/decimal-to-binary.html

const calc = (a: number, expected: number) => {
  const original = a;
  const encoded = gray_code(a);

  console.log(yellow(`==============================`));
  console.log(`Input : ${original}`, `Output: ${encoded}`);
  console.log(`Result: ${expected === encoded ? green("OK") : red("KO")}`);
};

calc(0, 0);
calc(1, 1);
calc(2, 3);
calc(3, 2);
calc(4, 6);
calc(5, 7);
calc(6, 5);
calc(7, 4);
calc(8, 12);
