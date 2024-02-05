import { conjunctive_normal_form } from "./conjunctive_normal_form";
import { yellow } from "console-log-colors";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  const cnfForm = conjunctive_normal_form(formula);
  console.log("Input : ", formula);
  console.log("Output: ", cnfForm);
};

console.log("[ EX06 ]");
calc("AB&!");
calc("AB|!");
calc("AB|C&");
calc("AB|C|D|");
calc("AB&C&D&");
calc("AB&!C!|");
calc("AB|!C!&");
calc("ABCD&|&");
