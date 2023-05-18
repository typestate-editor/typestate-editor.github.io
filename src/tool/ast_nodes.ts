import { Token } from "antlr4";

export type Optional<T> = T | null | undefined;

export class Position {
  constructor(public readonly line: number, public readonly column: number) {}
}

export const FAKE_POS = new Position(1, 0);

export function tokenToPos(token: Token): Position {
  return new Position(token.line, token.column);
}

export type TNode = {
  readonly pos: Position;
};

export type TRefNode = TNode & {
  readonly string: string;
};

export type TMemberNode = TRefNode & {
  readonly type: "member";
  readonly ref: TRefNode;
  readonly id: TIdNode;
};

export function makeMember(
  pos: Position,
  ref: TRefNode,
  id: TIdNode
): TMemberNode {
  return {
    type: "member",
    pos,
    ref,
    id,
    string: `${ref.string}.${id.string}`,
  };
}

export type TIdNode = TRefNode & {
  readonly type: "id";
  readonly name: string;
};

export function makeId(pos: Position, name: string): TIdNode {
  return {
    type: "id",
    pos,
    name,
    string: name,
  };
}

export type TArrayTypeNode = TRefNode & {
  readonly type: "arrayType";
  readonly ref: TRefNode;
};

export function makeArrayType(pos: Position, ref: TRefNode): TArrayTypeNode {
  return {
    type: "arrayType",
    pos,
    ref,
    string: `${ref.string}[]`,
  };
}

export type TDecisionNode = TNode & {
  readonly type: "decision";
  readonly label: string;
  readonly destination: TIdNode | TStateNode;
};

export function makeDecision(
  pos: Position,
  label: string,
  destination: TIdNode | TStateNode
): TDecisionNode {
  return {
    type: "decision",
    pos,
    label,
    destination,
  };
}

export type TDecisionStateNode = TNode & {
  readonly type: "decisionState";
  readonly decisions: readonly TDecisionNode[];
};

export function makeDecisionState(
  pos: Position,
  decisions: readonly TDecisionNode[]
): TDecisionStateNode {
  return {
    type: "decisionState",
    pos,
    decisions,
  };
}

export type TDeclarationNode = TNode & {
  readonly type: "declaration";
  readonly name: string;
  readonly states: readonly TStateNode[];
};

export function makeDeclaration(
  pos: Position,
  name: string,
  states: readonly TStateNode[]
): TDeclarationNode {
  return {
    type: "declaration",
    pos,
    name,
    states,
  };
}

export type TMethodNode = TNode & {
  readonly type: "method";
  readonly returnType: TRefNode;
  readonly name: string;
  readonly args: readonly TRefNode[];
  readonly destination: TIdNode | TStateNode | TDecisionStateNode;
};

export function makeMethod(
  pos: Position,
  returnType: TRefNode,
  name: string,
  args: readonly TRefNode[],
  destination: TIdNode | TStateNode | TDecisionStateNode
): TMethodNode {
  return { type: "method", pos, returnType, name, args, destination };
}

export type TStateNode = TNode & {
  readonly type: "state";
  readonly name: Optional<string>;
  readonly methods: readonly TMethodNode[];
  readonly isDroppable: boolean;
};

export function makeState(
  pos: Position,
  name: Optional<string>,
  methods: readonly TMethodNode[],
  isDroppable: boolean
): TStateNode {
  return {
    type: "state",
    pos,
    name,
    methods,
    isDroppable,
  };
}

export type TPackageNode = TNode & {
  readonly type: "package";
  readonly ref: TRefNode;
};

export function makePackage(pos: Position, ref: TRefNode): TPackageNode {
  return {
    type: "package",
    pos,
    ref,
  };
}

export type TImportNode = TNode & {
  readonly type: "import";
  readonly ref: TRefNode;
  readonly staticc: boolean;
  readonly star: boolean;
};

export function makeImport(
  pos: Position,
  ref: TRefNode,
  staticc: boolean,
  star: boolean
): TImportNode {
  return {
    type: "import",
    pos,
    ref,
    staticc,
    star,
  };
}

export type TTypestateNode = TNode & {
  readonly type: "typestate";
  readonly pkg: Optional<TPackageNode>;
  readonly imports: readonly TImportNode[];
  readonly decl: TDeclarationNode;
};

export function makeTypestate(
  pkg: Optional<TPackageNode>,
  imports: readonly TImportNode[],
  decl: TDeclarationNode
): TTypestateNode {
  return {
    type: "typestate",
    pos: (pkg ?? imports[0] ?? decl).pos,
    pkg,
    imports,
    decl,
  };
}
