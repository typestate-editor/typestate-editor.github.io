import type monaco from "monaco-editor";

// https://microsoft.github.io/monaco-editor/monarch.html
// https://github.com/microsoft/monaco-languages/

type Monaco = typeof monaco;
type IRichLanguageConfiguration = monaco.languages.LanguageConfiguration;
type ILanguage = monaco.languages.IMonarchLanguage;
type ILanguageExtensionPoint = monaco.languages.ILanguageExtensionPoint;

export const conf: IRichLanguageConfiguration = {
  wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "<", close: ">" },
  ],
  folding: {
    markers: {
      start: new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),
      end: new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))"),
    },
  },
};

export const language = <ILanguage>{
  defaultToken: "",
  tokenPostfix: ".protocol",

  keywords: [
    "default",
    "package",
    "boolean",
    "this",
    "double",
    "implements",
    "byte",
    "import",
    "public",
    "throws",
    "extends",
    "int",
    "short",
    "char",
    "void",
    "long",
    "float",
    "true",
    "false",
    "end",
    "typestate",
  ],

  brackets: [
    { open: "{", close: "}", token: "delimiter.bracket" },
    { open: "[", close: "]", token: "delimiter.bracket" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
    { open: "<", close: ">", token: "delimiter.angle" },
  ],

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // Identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // To show class names nicely
      [/[A-Z][\w\$]*/, "type.identifier"],

      // Whitespace
      { include: "@whitespace" },

      // Delimiters
      [/[{}()\[\]]/, "@brackets"],
      [/[<>]/, "@brackets"],
      [/[;,]/, "delimiter"],
    ],

    whitespace: [
      [/[ \t\r\n\f]+/, ""],
      [/\/\*\*(?!\/)/, "comment.doc", "@javadoc"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    javadoc: [
      [/[^\/*]+/, "comment.doc"],
      [/\/\*/, "comment.doc.invalid"],
      [/\*\//, "comment.doc", "@pop"],
      [/[\/*]/, "comment.doc"],
    ],
  },
};

export function register(monaco: Monaco) {
  const def: ILanguageExtensionPoint = {
    id: "typestate",
    extensions: [".protocol"],
    aliases: ["mungo", "typestate", "protocol"],
    mimetypes: ["text/mungo"],
  };

  monaco.languages.register(def);
  monaco.languages.setMonarchTokensProvider(def.id, language);
  monaco.languages.onLanguage(def.id, () => {
    monaco.languages.setLanguageConfiguration(def.id, conf);
  });
}
