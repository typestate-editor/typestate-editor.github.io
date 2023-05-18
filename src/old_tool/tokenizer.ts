import { error } from "./utils";

// Reference: https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html

function isIdentifierStart(code: number): boolean {
  if (code < 65) return code === 36; // 36 -> $
  if (code < 91) return true; // 65-90 -> A-Z
  if (code < 97) return code === 95; // 95 -> _
  if (code < 123) return true; // 97-122 -> a-z
  return false;
}

function isIdentifierChar(code: number): boolean {
  if (code < 48) return code === 36; // 36 -> $
  if (code < 58) return true; // 48-57 -> 0-9
  return isIdentifierStart(code);
}

const lineBreak = /\r\n?|\n/;
const lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code: number): boolean {
  return code === 10 || code === 13;
}

const keywords = [
  "abstract",
  "assert",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extends",
  "final",
  "finally",
  "float",
  "for",
  "goto",
  "if",
  "implements",
  "import",
  "instanceof",
  "int",
  "interface",
  "long",
  "native",
  "new",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "strictfp",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "try",
  "void",
  "volatile",
  "while",
];

export function isReserved(word: string) {
  return keywords.includes(word);
}

export type Position = {
  pos: number;
  line: number;
  column: number;
};

export type Location = {
  start: Position;
  end: Position;
};

export class Token {
  readonly type: string;
  readonly value: string;
  readonly loc: Location;
  constructor(type: string, value: string, loc: Location) {
    this.type = type;
    this.value = value;
    this.loc = loc;
  }
}

export const FAKE_LOC = {
  start: {
    pos: 0,
    line: 0,
    column: 0,
  },
  end: {
    pos: 0,
    line: 0,
    column: 0,
  },
};

export default class Tokenizer {
  readonly input: string;
  readonly inputLen: number;
  pos: number;
  lineStart: number;
  curLine: number;
  start: Position;
  lastToken: Token;

  constructor(input: string) {
    this.input = input;
    this.inputLen = input.length;
    this.pos = 0;
    this.lineStart = 0;
    this.curLine = 1;
    this.start = this.curPosition();
    this.lastToken = new Token("", "", {
      start: this.start,
      end: this.start,
    });
  }

  curPosition(): Position {
    return {
      pos: this.pos,
      line: this.curLine,
      column: this.pos - this.lineStart,
    };
  }

  nextLine() {
    this.lineStart = this.pos;
    this.curLine++;
  }

  codeAt(pos: number) {
    return this.input.charCodeAt(pos);
  }

  charAt(pos: number) {
    return this.input.charAt(pos);
  }

  currToken(): Token {
    return this.lastToken;
  }

  newToken(type: string, value: string): Token {
    return new Token(type, value, {
      start: this.start,
      end: this.curPosition(),
    });
  }

  nextToken(): Token {
    this.skipSpace();
    this.start = this.curPosition();
    if (this.pos >= this.inputLen) {
      this.lastToken = this.newToken("eof", "");
    } else {
      this.lastToken = this.readToken(this.charAt(this.pos));
    }
    return this.lastToken;
  }

  consumeNewLine(): number {
    const start = this.pos;
    const code = this.codeAt(this.pos);
    switch (code) {
      case 13: // '\r' carriage return
        // If the next char is '\n', move to pos+1 and let the next branch handle it
        if (this.codeAt(this.pos + 1) === 10) {
          this.pos++;
        }
      case 10: // '\n' line feed
        this.pos++;
        this.nextLine();
    }
    return this.pos - start;
  }

  skip(): boolean {
    const code = this.codeAt(this.pos);
    switch (code) {
      case 13: // '\r' carriage return
        // If the next char is '\n', move to pos+1 and let the next branch handle it
        if (this.codeAt(this.pos + 1) === 10) {
          this.pos++;
        }
      case 10: // '\n' line feed
        this.pos++;
        this.nextLine();
        return true;
      case 9: // horizontal tab
      case 12: // form feed
      case 32: // space
        this.pos++;
        return true;

      case 47: // '/'
        switch (this.codeAt(this.pos + 1)) {
          case 42: // '*'
            this.skipBlockComment();
            return true;
          case 47:
            this.skipLineComment();
            return true;
        }
    }
    return false;
  }

  skipSpace(): void {
    while (this.pos < this.inputLen) {
      if (!this.skip()) {
        break;
      }
    }
  }

  skipLineComment(): void {
    let ch = this.codeAt((this.pos += 2));
    if (this.pos < this.inputLen) {
      while (!isNewLine(ch) && ++this.pos < this.inputLen) {
        ch = this.codeAt(this.pos);
      }
    }
  }

  skipBlockComment(): void {
    const start = this.pos;
    const end = this.input.indexOf("*/", (this.pos += 2));
    if (end === -1) {
      throw error("Unterminated comment", this.curPosition());
    }
    this.pos = end + 2;

    lineBreakG.lastIndex = start;

    let match;
    while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
      this.curLine++;
      this.lineStart = match.index + match[0].length;
    }
  }

  readWord(): Token {
    const start = this.pos;
    while (this.pos < this.inputLen) {
      if (isIdentifierChar(this.codeAt(this.pos))) {
        this.pos++;
      } else {
        break;
      }
    }
    const word = this.input.slice(start, this.pos);
    return this.newToken("identifier", word);
  }

  readToken(char: string): Token {
    switch (char) {
      case "<":
      case ">":
      case "(":
      case ")":
      case ":":
      case "{":
      case "}":
      case ",":
      case "=":
      case ".":
      case ";":
        this.pos++;
        return this.newToken(char, char);
    }

    if (isIdentifierStart(char.charCodeAt(0))) {
      return this.readWord();
    }

    throw error(`Unexpected character '${this.charAt(this.pos)}'`, this.start);
  }
}
