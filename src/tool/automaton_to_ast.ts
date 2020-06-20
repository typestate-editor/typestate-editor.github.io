import type {
  Typestate,
  Identifier,
  State,
  DecisionState,
  NamedState,
  UnnamedState,
  Destination,
} from "./ast_types";
import type { Automaton } from "./automaton_types";
import { FAKE_LOC } from "./tokenizer";

function check(name: string, automaton: Automaton) {
  if (/decision:/.test(name)) {
    if (automaton.choices.has(name)) {
      return;
    }
    throw new Error(`${name} is not in choices set`);
  }
  if (automaton.states.has(name)) {
    return;
  }
  throw new Error(`${name} is not in states set`);
}

function createIdentifier(name: string): Identifier {
  return {
    type: "Identifier",
    name,
    loc: FAKE_LOC,
  };
}

function createLabelTransition(
  name: string,
  automaton: Automaton
): Identifier | UnnamedState {
  check(name, automaton);

  if (/unknown:/.test(name)) {
    return createUnnamedState(name, automaton);
  }

  if (/decision:/.test(name)) {
    throw new Error(
      `Cannot have a transition from a decision state to ${name}`
    );
  }

  return createIdentifier(name);
}

function createMethodTransition(
  name: string,
  automaton: Automaton
): Destination {
  check(name, automaton);

  if (/unknown:/.test(name)) {
    return createUnnamedState(name, automaton);
  }

  if (/decision:/.test(name)) {
    return createDecisionState(name, automaton);
  }

  return createIdentifier(name);
}

function createDecisionState(
  name: string,
  automaton: Automaton
): DecisionState {
  const state: DecisionState = {
    type: "DecisionState",
    transitions: [],
    _name: name,
    loc: FAKE_LOC,
  };

  for (const transition of automaton.lTransitions) {
    if (transition.from === state._name) {
      state.transitions.push([
        createIdentifier(transition.transition.name),
        createLabelTransition(transition.to, automaton),
      ]);
    }
  }

  return state;
}

function applyTransitions<T extends State>(state: T, automaton: Automaton): T {
  for (const transition of automaton.mTransitions) {
    if (transition.from === state._name) {
      state.methods.push({
        type: "Method",
        name: transition.transition.name,
        arguments: transition.transition.arguments.map(createIdentifier),
        returnType: createIdentifier(transition.transition.returnType),
        transition: createMethodTransition(transition.to, automaton),
        loc: FAKE_LOC,
      });
    }
  }
  return state;
}

function createUnnamedState(name: string, automaton: Automaton): UnnamedState {
  return applyTransitions(
    {
      type: "State",
      name: null,
      methods: [],
      _name: name,
      loc: FAKE_LOC,
    },
    automaton
  );
}

function createNamedState(name: string, automaton: Automaton): NamedState {
  return applyTransitions(
    {
      type: "State",
      name,
      methods: [],
      _name: name,
      loc: FAKE_LOC,
    },
    automaton
  );
}

export default function automatonToAst(
  name: string,
  automaton: Automaton
): Typestate {
  const ast: Typestate = {
    type: "Typestate",
    name,
    states: [],
    loc: FAKE_LOC,
  };

  // Make sure the first state is the start
  if (automaton.start !== "end") {
    ast.states.push(createNamedState(automaton.start, automaton));
  }

  for (const state of automaton.states) {
    if (state !== "end" && state !== automaton.start && !/:/.test(state)) {
      ast.states.push(createNamedState(state, automaton));
    }
  }

  return ast;
}
