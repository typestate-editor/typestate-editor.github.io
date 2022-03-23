import type Monaco from "monaco-editor";

export type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;
export type IEditorOptions = Monaco.editor.IEditorOptions;
export type IGlobalEditorOptions = Monaco.editor.IGlobalEditorOptions;
export type ITextModelUpdateOptions = Monaco.editor.ITextModelUpdateOptions;
export type EndOfLineSequence = Monaco.editor.EndOfLineSequence;

export type EditorOptions = {
  theme: "light" | "dark";
  tabSize: number;
  indentType: "spaces" | "tabs";
  eof: "lf" | "crlf";
};

export function updateOptions(
  monaco: typeof Monaco,
  editor: MonacoEditor,
  options: EditorOptions
) {
  monaco.editor.setTheme(options.theme);

  const editorOpts: IEditorOptions | IGlobalEditorOptions = {
    insertSpaces: options.indentType === "spaces",
    tabSize: options.tabSize,
    trimAutoWhitespace: true,
    detectIndentation: false,
  };

  editor.updateOptions(editorOpts);

  const modelOpts: ITextModelUpdateOptions = {
    indentSize: options.tabSize,
    insertSpaces: options.indentType === "spaces",
    tabSize: options.tabSize,
    trimAutoWhitespace: true,
  };

  const model = editor.getModel()!;
  model.updateOptions(modelOpts);
  model.pushEOL(options.eof === "lf" ? 0 : 1);
}
