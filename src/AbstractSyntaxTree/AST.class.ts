import { pipe, range, map, fromEntries } from "@fxts/core";

type TokenType = "operator" | "operand" | "variable" | "missing";
type AstOperators = {
  [key: string]: Function;
};
type AstOperands = {
  [key: string]: boolean;
};
type AstLabels = {
  [key: string]: string;
};

export type AstVariables = Map<string, boolean | undefined>;

export class Node {
  type: TokenType;
  token: string;
  left?: Node;
  right?: Node;

  constructor(token: string, type: TokenType = "missing") {
    this.token = token;
    this.type = type;
  }
}

// Abstract Syntax Tree
export class AST {
  public formula: string;
  public root?: Node;
  public variables: AstVariables;
  public static operators: AstOperators = {
    "&": (a: boolean, b: boolean) => a && b,
    "|": (a: boolean, b: boolean) => a || b,
    "^": (a: boolean, b: boolean) => a !== b,
    "=": (a: boolean, b: boolean) => a === b,
    ">": (a: boolean, b: boolean) => !a || b,
    "!": (a: boolean) => !a,
  };
  public static operands: AstOperands = {
    "0": false,
    "1": true,
  };
  public static labels: AstLabels = {
    "0": "⊥",
    "1": "⊤",
    "!": "¬",
    "&": "∧",
    "|": "∨",
    "^": "⊕",
    "=": "⇔",
    ">": "⇒",
    ...pipe(
      range(26),
      map((i): [string, string] => [String.fromCharCode(i + 65), String.fromCharCode(i + 65)]),
      fromEntries,
    ),
  };

  constructor(formula: string) {
    this.formula = formula;
    this.variables = new Map();
    this._parse();
  }

  private _parse() {
    const stack: Node[] = [];
    const tokens = AST.tokenize(this.formula);

    try {
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const node = new Node(token);

        if (!AST.isValidToken(token, i)) {
          throw new Error(`[AST parse error]: Invalid token: ${token} at ${i + 1}`);
        }

        if (AST.operands.hasOwnProperty(token)) {
          node.type = "operand";
        } else if (AST.operators.hasOwnProperty(token)) {
          node.type = "operator";
          AST.combineOperandsToOperator(stack, node);
        } else {
          node.type = "variable";
          this.variables.set(token, undefined);
        }

        stack.push(node);
      }

      if (stack.length === 0) throw new Error("[AST parse error]: Root node is empty");
      if (stack.length > 1) throw new Error("[AST parse error]: Too many operators or variables");

      this.root = stack[0];
    } catch (error: any) {
      console.error(error.message || error);
      this.root = undefined;
    } finally {
      return this;
    }
  }

  static tokenize(rpn: string): string[] {
    const keywords = AST.getValidTokens().map((k) => k);
    const regExp = new RegExp(`|${keywords.join("|")}|`);
    const tokens = rpn.split(regExp);
    return tokens.filter((token) => !!token);
  }

  static getValidTokens(): string[] {
    return Object.keys(AST.labels);
  }

  static isBinaryOperator(token: string): boolean {
    const f = AST.operators[token];
    return f.length === 1;
  }

  static isValidToken(token: string, idx: number): boolean {
    if (idx === 0 && AST.operators.hasOwnProperty(token)) {
      return false;
    }
    return AST.labels.hasOwnProperty(token);
  }

  static combineOperandsToOperator(stack: Node[], node: Node) {
    if (!AST.isBinaryOperator(node.token)) {
      node.right = stack.pop();
      if (!node.right) throw new Error(`[AST parse error]: Missing operands on ${node.token}`);
    }
    node.left = stack.pop();
    if (!node.left) throw new Error(`[AST parse error]: Missing operands on ${node.token}`);
  }
}
