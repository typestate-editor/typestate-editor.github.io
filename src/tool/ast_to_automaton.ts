import {
  TDecisionNode,
  TDecisionStateNode,
  TMethodNode,
  TNode,
  TStateNode,
  TTypestateNode,
} from "./ast_nodes";
import type { Automaton } from "./automaton_types";
import { error } from "./utils";

class StateNames {
  private cache = new Map<TStateNode | TDecisionStateNode, string>();
  private unknownUuid = 1;
  private decisionUuid = 1;

  private unknown() {
    return `unknown:${this.unknownUuid++}`;
  }

  private decision() {
    return `decision:${this.decisionUuid++}`;
  }

  get(state: TStateNode | TDecisionStateNode) {
    let name = this.cache.get(state);
    if (name) {
      return name;
    }
    if (state.type === "decisionState") {
      name = this.decision();
    } else {
      name = state.name ?? this.unknown();
    }
    this.cache.set(state, name);
    return name;
  }
}

function checkState(automaton: Automaton, name: string, node: TNode) {
  if (/^unknown:/.test(name)) {
    automaton.states.add(name);
  } else if (/^decision:/.test(name)) {
    automaton.choices.add(name);
  } else if (name === "end") {
    // If we refer to "end" at least once, we add it to the automaton
    automaton.states.add(name);
    automaton.final.add(name);
  } else if (!automaton.states.has(name)) {
    throw error(`State not defined: ${name}`, node.pos);
  }
}

function equalNameAndArgs(a: TMethodNode, b: TMethodNode) {
  if (a.name !== b.name) {
    return false;
  }
  if (a.args.length !== b.args.length) {
    return false;
  }
  for (let i = 0; i < a.args.length; i++) {
    if (a.args[i].string !== b.args[i].string) {
      return false;
    }
  }
  return true;
}

function compileMethod(
  fromName: string,
  method: TMethodNode,
  automaton: Automaton,
  names: StateNames
) {
  const destination = method.destination;
  let toName;

  if (destination.type === "state") {
    compileState(destination, automaton, names);
    toName = names.get(destination);
  } else if (destination.type === "decisionState") {
    compileDecisionState(destination, automaton, names);
    toName = names.get(destination);
  } else {
    toName = destination.name;
  }

  checkState(automaton, toName, destination);

  const m = {
    name: method.name,
    arguments: method.args.map(a => a.string),
    returnType: method.returnType.string,
  };

  automaton.methods.push(m);

  automaton.mTransitions.push({
    from: fromName,
    transition: m,
    to: toName,
  });

  return automaton;
}

function compileLabel(
  fromName: string,
  { label, destination }: TDecisionNode,
  automaton: Automaton,
  names: StateNames
) {
  let toName;

  if (destination.type === "state") {
    compileState(destination, automaton, names);
    toName = names.get(destination);
  } else {
    toName = destination.name;
  }

  checkState(automaton, toName, destination);

  const l = {
    name: label,
  };

  automaton.labels.push(l);

  automaton.lTransitions.push({
    from: fromName,
    transition: l,
    to: toName,
  });

  return automaton;
}

function compileState(
  node: TStateNode,
  automaton: Automaton,
  names: StateNames
) {
  const fromName = names.get(node);
  checkState(automaton, fromName, node);

  if (node.isDroppable) {
    automaton.final.add(fromName);
  }

  for (let i = 0; i < node.methods.length; i++) {
    const method = node.methods[i];
    for (let j = 0; j < i; j++) {
      if (equalNameAndArgs(method, node.methods[j])) {
        throw error(
          `Duplicate method: ${method.name}(${method.args
            .map(a => a.string)
            .join(", ")})`,
          method.pos
        );
      }
    }
  }

  return node.methods.reduce(
    (automaton, method) => compileMethod(fromName, method, automaton, names),
    automaton
  );
}

function compileDecisionState(
  node: TDecisionStateNode,
  automaton: Automaton,
  names: StateNames
) {
  const fromName = names.get(node);
  checkState(automaton, fromName, node);

  const set = new Set();
  for (const decision of node.decisions) {
    const { label, pos } = decision;
    if (set.has(label)) {
      throw error(`Duplicate case label: ${label}`, pos);
    }
    set.add(label);
  }

  return node.decisions.reduce(
    (automaton, transition) =>
      compileLabel(fromName, transition, automaton, names),
    automaton
  );
}

export default function astToAutomaton(ast: TTypestateNode): Automaton {
  const stateNames = new StateNames();
  const states = ast.decl.states;

  if (states.length === 0) {
    throw error(`Typestate without states`, ast.pos);
  }

  const automaton: Automaton = {
    package: ast.pkg,
    imports: ast.imports,
    states: new Set(),
    choices: new Set(),
    methods: [],
    labels: [],
    start: stateNames.get(states[0]),
    final: new Set(),
    mTransitions: [],
    lTransitions: [],
  };

  // Get all named states
  for (const state of states) {
    if (state.name === "end") {
      throw error(`"end" is a reserved state name`, state.pos);
    }
    if (automaton.states.has(stateNames.get(state))) {
      throw error(`Duplicated ${state.name} state`, state.pos);
    }
    automaton.states.add(stateNames.get(state));
  }

  return states.reduce(
    (automaton, state) => compileState(state, automaton, stateNames),
    automaton
  );
}
