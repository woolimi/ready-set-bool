import { print_truth_table } from "./print_truth_table";
import { yellow } from "console-log-colors";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  print_truth_table(formula);
};

// calc("AB>");
// calc("AB>A>A>");
// calc("AB&C|");
// calc("AA&C|");
// calc("AZ&C!|");
calc("AB&C>");
