import {
  TDecisionNode,
  TDecisionStateNode,
  TIdNode,
  TMethodNode,
  TRefNode,
  TStateNode,
  TTypestateNode,
} from "./ast_nodes";

function generateRef(ref: TRefNode): string {
  return ref.string;
}

function generateDestination(
  dest: TIdNode | TStateNode | TDecisionStateNode
): string {
  if (dest.type === "id") {
    return generateRef(dest);
  }

  if (dest.type === "state") {
    return generateUnnamedState(dest);
  }

  return generateDecisionState(dest);
}

function generateLabel({ label, destination }: TDecisionNode): string {
  return `${label}: ${generateDestination(destination)}`;
}

function generateDecisionState(state: TDecisionStateNode): string {
  return `<${state.decisions.map(generateLabel).join(", ")}>`;
}

function generateMethod(method: TMethodNode): string {
  return `    ${generateRef(method.returnType)} ${method.name}(${method.args
    .map(generateRef)
    .join(", ")}): ${generateDestination(method.destination)}`;
}

function generateStateBody(state: TStateNode): string {
  const transitions = state.methods.map(generateMethod);
  if (state.isDroppable) {
    transitions.push(`    drop: end`);
  }
  return `${transitions.join(",\n")}\n`;
}

function generateUnnamedState(state: TStateNode): string {
  return `{\n${generateStateBody(state)}    }`;
}

function generateNamedState(state: TStateNode): string {
  return `  ${state.name} = {\n${generateStateBody(state)}  }`;
}

export default function generator(ast: TTypestateNode): string {
  let prefix = "";
  if (ast.pkg) {
    prefix += `package ${generateRef(ast.pkg.ref)};\n`;
  }
  for (const { ref, staticc, star } of ast.imports) {
    prefix += `import ${staticc ? "static " : ""}${generateRef(ref)}${
      star ? ".*" : ""
    };\n`;
  }

  return `typestate ${ast.decl.name} {\n${ast.decl.states
    .map(generateNamedState)
    .join("\n")}\n}\n`;
}
