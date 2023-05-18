import {
  CharStream,
  CommonTokenStream,
  Parser,
  RecognitionException,
  Token,
  ErrorListener,
} from "antlr4";
import TypestateLexer from "./parser/TypestateLexer";
import TypestateParser from "./parser/TypestateParser";
import { FAKE_POS, Position, makeId } from "./ast_nodes";
import { ErrorWithLocation } from "./utils";

class TypestateErrorListener extends ErrorListener<Token> {
  constructor() {
    super();
  }

  syntaxError(
    recognizer: Parser,
    offendingSymbol: Token,
    line: number,
    column: number,
    msg: string,
    e: RecognitionException | undefined
  ) {
    throw new ErrorWithLocation(msg, new Position(line, column));
  }
}

export function parse(input: string) {
  const chars = new CharStream(input);
  const lexer = new TypestateLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new TypestateParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new TypestateErrorListener());
  return parser.start().ast;
}

export function parseRef(input: string) {
  const chars = new CharStream(input);
  const lexer = new TypestateLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new TypestateParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new TypestateErrorListener());
  try {
    return parser.ref().node;
  } catch {
    return makeId(FAKE_POS, "ERROR");
  }
}
