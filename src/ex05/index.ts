import { printTruthTable, AST } from "../AbstractSyntaxTree";
import { negation_normal_form } from "./negation_normal_form";
import { yellow } from "console-log-colors";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  const cnfForm = negation_normal_form(formula);
  console.log("Input : ", formula);
  printTruthTable(new AST(formula));
  console.log("Output: ", cnfForm);
  printTruthTable(new AST(cnfForm));
};

console.log("[ EX05 ]");
// calc("A");
// calc("A!");
// calc("AB&!");
// calc("AB|!");
// calc("AB>!");
// calc("AB=!");

calc("ABC||");
calc("ABC||!");
calc("ABC|&");
calc("ABC&|!");
calc("ABC^^");
calc("ABC>>");
