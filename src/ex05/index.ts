import { negation_normal_form } from "./negation_normal_form";
import { yellow } from "console-log-colors";

const calc = (formula: string) => {
  console.log(yellow(`==============================`));
  const negationForm = negation_normal_form(formula);
  console.log(negationForm);
};

console.log("[ EX05 ]");
calc("A");
calc("A!");
calc("AB&!");
calc("AB|!");
calc("AB>!");
calc("AB=!");

// calc("AB&!");
// calc("AB|!");
// calc("AB|C&!");
