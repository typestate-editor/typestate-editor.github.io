import type {
  Typestate,
  Identifier,
  DecisionState,
  NamedState,
  Method,
  DecisionTransition,
  Destination,
  UnnamedState,
} from "./ast_types";

function generateIdentifier(identifier: Identifier): string {
  return identifier.name;
}

function generateTransition(transition: Destination): string {
  if (transition.type === "Identifier") {
    return generateIdentifier(transition);
  }

  if (transition.type === "State") {
    return generateUnnamedState(transition);
  }

  return generateDecisionState(transition);
}

function generateLabel([label, to]: DecisionTransition): string {
  return `${generateIdentifier(label)}: ${generateTransition(to)}`;
}

function generateDecisionState(state: DecisionState): string {
  return `<${state.transitions.map(generateLabel).join(", ")}>`;
}

function generateMethod(method: Method): string {
  return `    ${generateIdentifier(method.returnType)} ${
    method.name
  }(${method.arguments
    .map(generateIdentifier)
    .join(", ")}): ${generateTransition(method.transition)}`;
}

function generateUnnamedState(state: UnnamedState): string {
  return `{\n${state.methods.map(generateMethod).join(",\n")}\n}`;
}

function generateNamedState(state: NamedState): string {
  return `  ${state.name} = {\n${state.methods
    .map(generateMethod)
    .join(",\n")}\n  }`;
}

export default function generator(ast: Typestate): string {
  return `typestate ${ast.name} {\n${ast.states
    .map(generateNamedState)
    .join("\n")}\n}\n`;
}
