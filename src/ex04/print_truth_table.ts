import { AST, printTruthTable } from "../AbstractSyntaxTree";

export const print_truth_table = (formula: string) => {
  try {
    const tree = new AST(formula);
    printTruthTable(tree);
  } catch (error: any) {
    console.log(error?.message || error);
    return false;
  }
};
