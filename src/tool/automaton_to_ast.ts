import type { Automaton } from "./automaton_types";
import {
  FAKE_POS,
  TDecisionStateNode,
  TIdNode,
  TMethodNode,
  TStateNode,
  TTypestateNode,
  makeDecision,
  makeDecisionState,
  makeDeclaration,
  makeId,
  makeMethod,
  makeState,
  makeTypestate,
} from "./ast_nodes";
import { parseRef } from "./parse";

function check(name: string, automaton: Automaton) {
  if (/^decision:/.test(name)) {
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

function createIdentifier(name: string): TIdNode {
  return makeId(FAKE_POS, name);
}

function createLabelTransition(
  name: string,
  automaton: Automaton
): TIdNode | TStateNode {
  check(name, automaton);

  if (/^unknown:/.test(name)) {
    return createUnnamedState(name, automaton);
  }

  if (/^decision:/.test(name)) {
    throw new Error(
      `Cannot have a transition from a decision state to ${name}`
    );
  }

  return createIdentifier(name);
}

function createMethodTransition(
  name: string,
  automaton: Automaton
): TIdNode | TStateNode | TDecisionStateNode {
  check(name, automaton);

  if (/^unknown:/.test(name)) {
    return createUnnamedState(name, automaton);
  }

  if (/^decision:/.test(name)) {
    return createDecisionState(name, automaton);
  }

  return createIdentifier(name);
}

function createDecisionState(
  name: string,
  automaton: Automaton
): TDecisionStateNode {
  const decisions = [];

  for (const transition of automaton.lTransitions) {
    if (transition.from === name) {
      decisions.push(
        makeDecision(
          FAKE_POS,
          transition.transition.name,
          createLabelTransition(transition.to, automaton)
        )
      );
    }
  }

  return makeDecisionState(FAKE_POS, decisions);
}

function createMethodTransitions(
  fromName: string,
  automaton: Automaton
): readonly TMethodNode[] {
  const methods = [];
  for (const transition of automaton.mTransitions) {
    if (transition.from === fromName) {
      methods.push(
        makeMethod(
          FAKE_POS,
          parseRef(transition.transition.returnType),
          transition.transition.name,
          transition.transition.arguments.map(parseRef),
          createMethodTransition(transition.to, automaton)
        )
      );
    }
  }
  return methods;
}

function createUnnamedState(name: string, automaton: Automaton): TStateNode {
  return makeState(
    FAKE_POS,
    null,
    createMethodTransitions(name, automaton),
    automaton.final.has(name)
  );
}

function createNamedState(name: string, automaton: Automaton): TStateNode {
  return makeState(
    FAKE_POS,
    name,
    createMethodTransitions(name, automaton),
    automaton.final.has(name)
  );
}

export default function automatonToAst(
  name: string,
  automaton: Automaton
): TTypestateNode {
  const states = [];

  // Make sure the first state is the start
  states.push(createNamedState(automaton.start, automaton));

  for (const state of automaton.states) {
    if (state !== "end" && state !== automaton.start && !/:/.test(state)) {
      states.push(createNamedState(state, automaton));
    }
  }

  return makeTypestate(
    automaton.package,
    automaton.imports,
    makeDeclaration(FAKE_POS, name, states)
  );
}
