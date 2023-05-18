import type {
  AstNode,
  Typestate,
  State,
  DecisionState,
  Method,
  DecisionTransition,
} from "./ast_types";
import type { Automaton } from "./automaton_types";
import { error } from "./utils";

function checkState(automaton: Automaton, name: string, node: AstNode) {
  if (/:/.test(name)) {
    if (/^decision:/.test(name)) {
      automaton.choices.add(name);
    } else {
      automaton.states.add(name);
    }
  } else if (!automaton.states.has(name)) {
    throw error(`State not defined: ${name}`, node.loc.start);
  }
}

function equalSignature(a: Method, b: Method) {
  if (a.name !== b.name) {
    return false;
  }
  if (a.arguments.length !== b.arguments.length) {
    return false;
  }
  for (let i = 0; i < a.arguments.length; i++) {
    if (a.arguments[i].name !== b.arguments[i].name) {
      return false;
    }
  }
  return true;
}

function compileMethod(fromName: string, method: Method, automaton: Automaton) {
  const transition = method.transition;
  let toName = "";

  if (transition.type === "State") {
    compileState(transition, automaton);
    toName = transition._name;
  } else if (transition.type === "DecisionState") {
    compileDecisionState(transition, automaton);
    toName = transition._name;
  } else if (transition.type === "Identifier") {
    toName = transition.name;
  }

  checkState(automaton, toName, transition);

  const m = {
    name: method.name,
    arguments: method.arguments.map(a => a.name),
    returnType: method.returnType.name,
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
  [label, to]: DecisionTransition,
  automaton: Automaton
) {
  let toName = "";

  if (to.type === "State") {
    compileState(to, automaton);
    toName = to._name;
  } else if (to.type === "Identifier") {
    toName = to.name;
  }

  checkState(automaton, toName, to);

  const l = {
    name: label.name,
  };

  automaton.labels.push(l);

  automaton.lTransitions.push({
    from: fromName,
    transition: l,
    to: toName,
  });

  return automaton;
}

function compileState(node: State, automaton: Automaton) {
  const fromName = node._name;
  checkState(automaton, fromName, node);

  if (node.methods.length === 0) {
    automaton.final.add(fromName);
    return automaton;
  }

  for (let i = 0; i < node.methods.length; i++) {
    const method = node.methods[i];
    for (let j = 0; j < i; j++) {
      if (equalSignature(method, node.methods[j])) {
        throw error(
          `Duplicate method signature: ${method.name}(${method.arguments
            .map(a => a.name)
            .join(", ")})`,
          method.loc.start
        );
      }
    }
  }

  return node.methods.reduce(
    (automaton, method) => compileMethod(fromName, method, automaton),
    automaton
  );
}

function compileDecisionState(node: DecisionState, automaton: Automaton) {
  const fromName = node._name;
  checkState(automaton, fromName, node);

  const set = new Set();
  for (const [label] of node.transitions) {
    const labelName = label.name;
    if (set.has(labelName)) {
      throw error(`Duplicate case label: ${labelName}`, label.loc.start);
    }
    set.add(labelName);
  }

  return node.transitions.reduce(
    (automaton, transition) => compileLabel(fromName, transition, automaton),
    automaton
  );
}

export default function astToAutomaton(ast: Typestate): Automaton {
  const automaton: Automaton = {
    states: new Set(["end"]),
    choices: new Set(),
    methods: [],
    labels: [],
    // Compute the first state
    start: ast.states.length === 0 ? "end" : ast.states[0].name,
    final: new Set(["end"]),
    mTransitions: [],
    lTransitions: [],
  };

  // Get all named states
  for (const state of ast.states) {
    if (automaton.states.has(state.name)) {
      throw error(`Duplicated ${state.name} state`, state.loc.start);
    }
    automaton.states.add(state.name);
  }

  return ast.states.reduce(
    (automaton, state) => compileState(state, automaton),
    automaton
  );
}
