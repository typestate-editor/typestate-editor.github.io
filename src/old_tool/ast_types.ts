import type { Location } from "./tokenizer";

type BaseAstNode = Readonly<{
  loc: Location;
}>;

export type Typestate = Readonly<
  BaseAstNode & {
    type: "Typestate";
    name: string;
    states: NamedState[];
  }
>;

type AbstractState = Readonly<
  BaseAstNode & {
    type: "State";
    methods: Method[];
    _name: string;
  }
>;

export type UnnamedState = Readonly<AbstractState & { name: null }>;

export type NamedState = Readonly<AbstractState & { name: string }>;

export type State = UnnamedState | NamedState;

export type Destination = Identifier | UnnamedState | DecisionState;

export type Identifier = Readonly<
  BaseAstNode & {
    type: "Identifier";
    name: string;
  }
>;

export type Method = Readonly<
  BaseAstNode & {
    type: "Method";
    name: string;
    arguments: Identifier[];
    returnType: Identifier;
    transition: Destination;
  }
>;

export type DecisionTransition = readonly [
  Identifier,
  Identifier | UnnamedState
];

export type DecisionState = Readonly<
  BaseAstNode & {
    type: "DecisionState";
    transitions: DecisionTransition[];
    _name: string;
  }
>;

export type AstNode = Typestate | State | DecisionState | Identifier | Method;
