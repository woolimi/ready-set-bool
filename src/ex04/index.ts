import { print_truth_table } from "./print_truth_table";
import { yellow } from "console-log-colors";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  console.log("Input : ", formula);
  console.log("Output:");
  print_truth_table(formula);
};

// calc("A");
// calc("A!");
// calc("AB|");
// calc("AB&");
// calc("AB^");
// calc("AB>");
// calc("AB=");
// calc("AA=");

calc("ABC==");
calc("AB>C>");
calc("AB>A>A>");
