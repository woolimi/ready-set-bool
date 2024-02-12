import { pipe, range, map, isNil } from "@fxts/core";
import type { AstOperators, AstOperands, AstVariables } from "./AST.type";

type TokenType = "operator" | "operand" | "variable" | "missing";

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
export abstract class AST<T> {
  public formula: string;
  public root?: Node;
  public variables: AstVariables<T>;
  protected operators: AstOperators<T>;
  protected labels: Set<string>;
  protected operands?: AstOperands<T>;

  constructor(formula: string) {
    this.formula = formula;
    this.variables = new Map();
    this.operands = {};
    this.operators = {
      "&": (a: T, b: T) => [],
      "|": (a: T, b: T) => [],
      "^": (a: T, b: T) => [],
      "=": (a: T, b: T) => false,
      ">": (a: T, b: T) => [],
      "!": (a: T) => [],
    };
    this.labels = new Set();
  }

  public parse() {
    const stack: Node[] = [];
    const tokens = this.tokenize(this.formula);

    try {
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const node = new Node(token);

        if (!this.isValidToken(token, i)) {
          throw new Error(`[AST parse error]: Invalid token: ${token} at ${i + 1}`);
        }

        if (this.operands?.hasOwnProperty(token)) {
          node.type = "operand";
        } else if (this.operators.hasOwnProperty(token)) {
          node.type = "operator";
          this.combineOperandsToOperator(stack, node);
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
  public compute(): T | undefined {
    if (!this.root) return undefined;
    return this._compute(this.root);
  }

  private _compute(node: Node): T {
    if (node.type === "variable") {
      if (isNil(this.variables.get(node.token)))
        throw new Error(`[AST compute error]: Cannot calculate variable ${node.token}`);

      return this.variables.get(node.token) as T;
    }

    if (node.type === "operand") {
      return this.operands?.[node.token] as T;
    }

    const f = this.operators[node.token];

    return this.isBinaryOperator(node.token)
      ? f(this._compute(node.left as Node))
      : f(this._compute(node.left as Node), this._compute(node.right as Node));
  }

  private getValidTokens(): string[] {
    return [...this.labels];
  }

  private tokenize(rpn: string): string[] {
    const keywords = this.getValidTokens();
    const regExp = new RegExp(`|${keywords.join("|")}|`);
    const tokens = rpn.split(regExp);
    return tokens.filter((token) => !!token);
  }

  private isBinaryOperator(token: string): boolean {
    const f = this.operators[token];
    return f.length === 1;
  }

  private isValidToken(token: string, idx: number): boolean {
    if (idx === 0 && this.operators.hasOwnProperty(token)) {
      return false;
    }
    return this.labels.has(token);
  }

  private combineOperandsToOperator(stack: Node[], node: Node) {
    if (!this.isBinaryOperator(node.token)) {
      node.right = stack.pop();
      if (!node.right) throw new Error(`[AST parse error]: Missing operands on ${node.token}`);
    }
    node.left = stack.pop();
    if (!node.left) throw new Error(`[AST parse error]: Missing operands on ${node.token}`);
  }
}

export class ASTBool extends AST<boolean> {
  constructor(formula: string) {
    super(formula);
    this.operators = {
      "&": (a: boolean, b: boolean) => a && b,
      "|": (a: boolean, b: boolean) => a || b,
      "^": (a: boolean, b: boolean) => a !== b,
      "=": (a: boolean, b: boolean) => a === b,
      ">": (a: boolean, b: boolean) => !a || b,
      "!": (a: boolean) => !a,
    };
    this.operands = {
      "0": false,
      "1": true,
    };
    this.labels = new Set([
      ...Object.keys(this.operators),
      ...Object.keys(this.operands),
      ...pipe(
        range(26),
        map((i) => String.fromCharCode(i + 65)),
      ),
    ]);
    this.parse();
  }
}

export class ASTSet extends AST<Array<number>> {
  constructor(formula: string, sets: Array<Array<number>>) {
    super(formula);

    // Parse formula to get variables
    this.labels = new Set([
      ...Object.keys(this.operators),
      ...pipe(
        range(26),
        map((i) => String.fromCharCode(i + 65)),
      ),
    ]);

    this.parse();

    // Update variables with sets
    const variablesArr = [...this.variables];
    sets.forEach((set, idx) => {
      if (variablesArr[idx]) {
        variablesArr[idx][1] = set;
      } else {
        throw new Error("[ASTSet error]: Variable not found");
      }
    });
    this.variables = new Map(variablesArr);

    // Define Operators
    this.operators = {
      "&": (a: Array<number>, b: Array<number>) => {
        const setA = new Set(a);
        const setB = new Set(b);

        return [...setA].filter((x) => setB.has(x));
      },
      "|": (a: Array<number>, b: Array<number>) => {
        const setC = new Set([...a, ...b]);

        return [...setC];
      },
      "^": (a: Array<number>, b: Array<number>) => {
        const setA = new Set(a);
        const setB = new Set(b);
        const onlyA = [...setA].filter((x) => !setB.has(x));
        const onlyB = [...setB].filter((x) => !setA.has(x));

        return [...onlyA, ...onlyB];
      },
      "=": (a: Array<number>, b: Array<number>) => {
        // (A ⇔ B) ⇔ ((A ⇒ B) ∧ (B ⇒ A)) ⇔ (A ∧ B)
        const setA = new Set(a);
        const setB = new Set(b);
        return [...setA].filter((x) => setB.has(x));
      },
      ">": (a: Array<number>, b: Array<number>) => {
        const setA = new Set(a);
        const global = [...this.variables.values()].flat().filter((x) => !setA.has(x as number));

        return [...new Set([...b, ...global])];
      },
      "!": (a: Array<number>) => {
        const setA = new Set(a);
        const global = new Set([...this.variables.values()].flat());

        return [...global].filter((x) => !setA.has(x as number));
      },
    };
  }
}
