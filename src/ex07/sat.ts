import { ASTBool, makeTruthTable } from "../AbstractSyntaxTree";
export const sat = (formula: string): boolean => {
  const table = makeTruthTable(new ASTBool(formula));

  return table.some((row) => row[row.length - 1]);
};
