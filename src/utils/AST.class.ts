type TokenType = "operator" | "operand";
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
  type?: TokenType;
  token?: boolean | string;
  left?: Node;
  right?: Node;

  constructor(token?: boolean | string) {
    this.token = token;
  }
}

// Abstract Syntax Tree
export class AST {
  public formula: string;
  public root?: Node;
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
  };

  constructor(formula: string) {
    this.formula = formula;
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
        } else {
          node.type = "operator";

          if (!AST.isBinaryOperator(token)) {
            node.right = stack.pop();
            if (!node.right) throw new Error("[AST parse error]: invalid RPN expression");
          }
          node.left = stack.pop();
          if (!node.left) throw new Error("[AST parse error]: invalid RPN expression");
        }

        stack.push(node);
      }

      if (!stack[0]) throw new Error("[AST parse error]: root is empty");

      this.root = stack[0];
    } catch (error: any) {
      console.error(error.message);
    } finally {
      return this;
    }
  }

  public compute(): boolean | undefined {
    if (!this.root) {
      return undefined;
    }

    return AST._compute(this.root);
  }

  private static _compute(node: Node): boolean {
    if (node?.type === "operand") {
      return AST.operands[node.token as string];
    }
    const f = AST.operators[node?.token as string];
    return AST.isBinaryOperator(node?.token as string)
      ? f(AST._compute(node?.left as Node))
      : f(AST._compute(node?.right as Node), AST._compute(node?.left as Node));
  }
  static tokenize(rpn: string): string[] {
    const keywords = AST.getValidTokens().map((k) => k);
    const regExp = new RegExp(`|${keywords.join("|")}|`);
    const tokens = rpn.split(regExp);
    return tokens.filter((token) => !!token);
  }
  static getValidTokens(): string[] {
    return [...Object.keys(this.operators), ...Object.keys(this.operands)];
  }
  static isBinaryOperator(token: string): boolean {
    const f = AST.operators[token];
    return f.length === 1;
  }
  static isValidToken(token: string, idx: number): boolean {
    const tokens = AST.getValidTokens();
    const ops = Object.keys(AST.operators);

    if (idx === 0 && ops.includes(token)) {
      return false;
    }
    return tokens.includes(token);
  }
}
