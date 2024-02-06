import { AST, makeTruthTable } from "../AbstractSyntaxTree";
export const sat = (formula: string): boolean => {
  const table = makeTruthTable(new AST(formula));

  return table.some((row) => row[row.length - 1]);
};
