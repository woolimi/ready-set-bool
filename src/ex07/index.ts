import { sat } from "./sat";
import { yellow, green, red } from "console-log-colors";

const calc = (formula: string, expected: boolean) => {
  console.log(yellow(`==============================`));
  const result = sat(formula);
  console.log("Input   :", formula);
  console.log("Output  :", result);
  console.log("Expected:", expected);
  console.log("Result  :", result === expected ? green("OK") : red("KO"));
};

calc("A", true);
calc("A!", true);
calc("AA|", true);
calc("AA&", true);
calc("AA!&", false);
calc("AA^", false);
calc("AB^", true);
calc("AB=", true);
calc("AB>", true);
calc("AB!>", true);

calc("ABC||", true);
calc("AB&A!B!&&", false);
calc("ABCDE&&&&", true);
calc("AAA^^", true);
calc("ABCDE^^^^", true);
