import { eval_formula } from "./eval_formula";
import { yellow, red, blue, green } from "console-log-colors";
import { isUndefined } from "@fxts/core";

const calc = (formula: string, expected: boolean) => {
  console.log(yellow(`==============================`));
  const result = eval_formula(formula);
  console.log(`Input   : ${formula}`);
  console.log(`Output  : ${isUndefined(result) ? undefined : result ? blue("T") : red("F")}`);
  console.log("Expected:", expected ? blue("T") : red("F"));
  console.log("Result  :", result === expected ? green("OK") : red("KO"));
};

calc("0!", true);
calc("1!", false);
calc("00|", false);
calc("10|", true);
calc("01|", true);
calc("11|", true);
calc("10&", false);
calc("11&", true);
calc("11^", false);
calc("10^", true);
calc("00>", true);
calc("01>", true);
calc("10>", false);
calc("11>", true);
calc("00=", true);
calc("11=", true);
calc("10=", false);
calc("01=", false);

calc("11&0|", true);
calc("10&1|", true);
calc("11&1|", true);
calc("11&1|1^", false);
calc("01&1|1=", true);
calc("01&1&1&", false);
calc("0111&&&", false);
