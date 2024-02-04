import { AST } from "../utils/AST.class";

export const print_truth_table = (formula: string) => {
  try {
    const tree = new AST(formula);

    return tree.parse().printTruthTable();
  } catch (error: any) {
    console.log(error?.message || error);
    return false;
  }
};
