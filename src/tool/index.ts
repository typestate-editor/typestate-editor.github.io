import { parse } from "./parse";
import astToAutomaton from "./ast_to_automaton";
import automatonToAst from "./automaton_to_ast";
import generator from "./generator";

export function createAutomaton(text: string) {
  return astToAutomaton(parse(text));
}

export { parse, astToAutomaton, automatonToAst, generator };
