import { print_truth_table } from "./print_truth_table";
import { yellow, red, blue } from "console-log-colors";
import { isUndefined } from "@fxts/core";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  print_truth_table(formula);
};

calc("AB|");
calc("AB&C|");
calc("AA&C|");
calc("AZ&C!|");
