import { print_truth_table } from "./print_truth_table";
import { yellow, red, blue } from "console-log-colors";
import { isUndefined } from "@fxts/core";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  print_truth_table(formula);
};

calc("AB|");
// calc("11>");
// calc("10=");
// calc("1011||=");
