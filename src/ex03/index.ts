import { eval_formula } from "./eval_formula";
import { yellow, red, blue } from "console-log-colors";
import { isUndefined } from "@fxts/core";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  const result = eval_formula(formula);
  console.log(`Input : ${formula}`);
  console.log(`Output: ${isUndefined(result) ? undefined : result ? blue("T") : red("F")}`);
};

calc("10&");
calc("10|");
calc("11>");
calc("10=");
calc("1011||=");
