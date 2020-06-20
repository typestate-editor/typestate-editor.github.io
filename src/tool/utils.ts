import type { Position } from "./tokenizer";

export function positionToString(pos: Position) {
  return `${pos.line}:${pos.column}`;
}

export class ErrorWithLocation extends Error {
  readonly originalMessage: string;
  readonly loc: Position;
  readonly endLoc: Position;

  constructor(message: string, loc: Position, endLoc?: Position) {
    super(`${message} (at ${positionToString(loc)})`);
    this.originalMessage = message;
    this.loc = loc;
    this.endLoc = endLoc || loc;
  }
}

export function error(
  message: string,
  loc: Position,
  endLoc?: Position
): ErrorWithLocation {
  return new ErrorWithLocation(message, loc, endLoc);
}
