import { pipe, range, map, fromEntries, isNil, join, toArray, reverse } from "@fxts/core";
import { boolToStr } from "./helper";

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

class Node {
  type: TokenType;
  token: string;
  left?: Node;
  right?: Node;

  constructor(token: string) {
    this.token = token;
    this.type = "missing";
  }
}

// Abstract Syntax Tree
export class AST {
  public formula: string;
  public root?: Node;
  public variables: Map<string, boolean | undefined>;
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
  }

  public parse() {
    const tokens = AST.tokenize(this.formula);
    const stack: Node[] = [];

    try {
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const node = new Node(token);

        if (!AST.isValidToken(token, i)) {
          throw new Error(`[AST parse error]: Invalid token: ${token} at ${i}`);
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
      if (stack.length > 1 && stack[0].type !== "operator")
        throw new Error("[AST parse error]: Too many operators or variables");

      this.root = stack[0];
    } catch (error: any) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      return this;
    }
  }

  public compute(): boolean | undefined {
    if (!this.root) {
      return undefined;
    }
    return this._compute(this.root);
  }

  public printTruthTable() {
    const header = pipe(
      [...this.variables, ["=", undefined]],
      map(([k, _]) => k),
      join(" | "),
      (str) => `| ${str} |`,
    );
    const divider = pipe(
      range(this.variables.size + 1),
      map(() => "---"),
      join("|"),
      (str) => `|${str}|`,
    );

    console.log(header);
    console.log(divider);

    const nbVars = this.variables.size;
    const nbTotalCase = 2 ** nbVars;
    const maxNum = nbTotalCase - 1;
    const variableArray = pipe(
      this.variables,
      map(([k, _]) => k),
      reverse,
      toArray,
    );

    for (let testCase = 0; testCase < nbTotalCase; testCase++) {
      let flags = maxNum & testCase;
      for (let i = 0; i < nbVars; i++) {
        const key = variableArray[i][0];
        this.variables.set(key, !!(flags & 1));
        flags = flags >> 1;
      }
      const row = pipe(
        this.variables,
        map(([_, v]) => boolToStr(!!v)),
        toArray,
      );
      console.log(`| ${[...row, boolToStr(!!this.compute())].join(" | ")} |`);
    }
  }

  /**
   * private methods
   */
  private _compute(node: Node): boolean {
    if (node.type === "variable") {
      if (isNil(this.variables.get(node.token)))
        throw new Error(`[AST compute error]: Cannot calculate variable ${node.token}`);

      return this.variables.get(node.token) as boolean;
    }

    if (node.type === "operand") {
      return AST.operands[node.token];
    }

    const f = AST.operators[node.token];
    return AST.isBinaryOperator(node.token)
      ? f(this._compute(node.left as Node))
      : f(this._compute(node.left as Node), this._compute(node.right as Node));
  }

  private static tokenize(rpn: string): string[] {
    const keywords = AST.getValidTokens().map((k) => k);
    const regExp = new RegExp(`|${keywords.join("|")}|`);
    const tokens = rpn.split(regExp);
    return tokens.filter((token) => !!token);
  }

  private static getValidTokens(): string[] {
    return Object.keys(AST.labels);
  }

  private static isBinaryOperator(token: string): boolean {
    const f = AST.operators[token];
    return f.length === 1;
  }

  private static isValidToken(token: string, idx: number): boolean {
    if (idx === 0 && AST.operators.hasOwnProperty(token)) {
      return false;
    }
    return AST.labels.hasOwnProperty(token);
  }

  private static combineOperandsToOperator(stack: Node[], node: Node) {
    if (!AST.isBinaryOperator(node.token)) {
      node.right = stack.pop();
      if (!node.right) throw new Error(`[AST parse error]: Missing operands on ${node.token}`);
    }
    node.left = stack.pop();
    if (!node.left) throw new Error(`[AST parse error]: Missing operands on ${node.token}`);
  }
}
