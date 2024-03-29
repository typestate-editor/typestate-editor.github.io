import { Optional, TImportNode, TPackageNode } from "./ast_nodes";

export type Automaton = Readonly<{
  package: Optional<TPackageNode>;
  imports: readonly TImportNode[];
  states: Set<string>;
  choices: Set<string>;
  methods: AutomatonMethod[];
  labels: AutomatonLabel[];
  start: string;
  final: Set<string>;
  mTransitions: AutomatonTransition<AutomatonMethod>[];
  lTransitions: AutomatonTransition<AutomatonLabel>[];
}>;

export type AutomatonTransition<T> = Readonly<{
  from: string;
  transition: T;
  to: string;
}>;

export type AutomatonMethod = Readonly<{
  name: string;
  arguments: string[];
  returnType: string;
}>;

export type AutomatonLabel = Readonly<{
  name: string;
}>;
