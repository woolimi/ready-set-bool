import { eval_formula } from "./eval_formula";
import { yellow, red, blue } from "console-log-colors";
import { isUndefined } from "@fxts/core";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  const result = eval_formula(formula);
  console.log(`Input : ${formula}`);
  console.log(`Output: ${isUndefined(result) ? undefined : result ? blue("T") : red("F")}`);
};

// calc("0!");
// calc("1!");
// calc("00|");
// calc("10|");
// calc("01|");
// calc("11|");
// calc("10&");
// calc("11&");
// calc("11^");
// calc("10^");
// calc("00>");
// calc("01>");
// calc("10>");
// calc("11>");
// calc("00=");
// calc("11=");
// calc("10=");
// calc("01=");

calc("11&0|");
calc("10&1|");
calc("11&1|");
calc("11&1|1^");
calc("01&1|1=");
calc("01&1&1&");
calc("0111&&&");
