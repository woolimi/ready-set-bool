import { printTruthTable, AST } from "../AbstractSyntaxTree";
import { sat } from "./sat";
import { yellow } from "console-log-colors";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  const result = sat(formula);
  console.log("Input : ", formula);
  console.log("Output: ", result);
};

// calc("A");
// calc("A!");
// calc("AA|");
// calc("AA&");
// calc("AA!&");
// calc("AA^");
// calc("AB^");
// calc("AB=");
// calc("AB>");
// calc("AB!>");

calc("ABC||");
calc("AB&A!B!&&");
calc("ABCDE&&&&");
calc("AAA^^");
calc("ABCDE^^^^");
