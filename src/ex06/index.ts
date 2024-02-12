import { printTruthTable, ASTBool } from "../AbstractSyntaxTree";
import { conjunctive_normal_form } from "./conjunctive_normal_form";
import { yellow } from "console-log-colors";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  const cnfForm = conjunctive_normal_form(formula);
  console.log("Input : ", formula);
  printTruthTable(new ASTBool(formula));
  console.log("Output: ", cnfForm);
  printTruthTable(new ASTBool(cnfForm));
};

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
