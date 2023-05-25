import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorWithLocation } from "../tool/utils";
import { MonacoLanguages } from "./languages";
import MiniBar from "./mini-bar";
import MonacoEditor, { EditorProps } from "./monaco-editor";

const textareaSize = {
  width: "550px",
  height: "700px",
} as const;

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    margin: theme.spacing(1),
  },
  side: {
    float: "left",
    margin: "0 10px",
  },
  hide: {
    display: "none",
  },
  show: {
    display: "block",
  },
  clear: {
    clear: "both",
  },
}));

export type TransformerProps<T> = {
  title: string;
  language: MonacoLanguages;
  fn: (text: string) => T;
  render: (result: T) => JSX.Element;
};

type Data<T> = { result: T | null; error: any };

const textEditorOpts = {
  minimap: {
    enabled: false,
  },
} as const;

export default function Transformer<T>(props: TransformerProps<T>) {
  const classes = useStyles();
  const { title, fn, render } = props;
  const [data, setData] = useState<Data<T>>({ result: null, error: null });
  const { result, error } = data;
  const [{ fn: getValue }, setGetValue] = useState<{
    fn: (() => string) | null;
  }>({
    fn: null,
  });

  function onDo() {
    if (getValue) {
      const value = getValue();
      try {
        setData({
          result: fn(value),
          error: null,
        });
      } catch (error) {
        setData({
          result,
          error,
        });
        if (error instanceof ErrorWithLocation) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    }
  }

  const markers: EditorProps["markers"] =
    error instanceof ErrorWithLocation
      ? [
          {
            severity: 8,
            message: error.originalMessage,
            startLineNumber: error.loc.line,
            startColumn: error.loc.column + 1,
            endLineNumber: error.endLoc.line,
            endColumn: error.endLoc.column + 1,
          },
        ]
      : error
      ? [
          {
            severity: 8,
            message: error.message,
            startLineNumber: 0,
            startColumn: 0,
            endLineNumber: 0,
            endColumn: 0,
          },
        ]
      : [];

  return (
    <div className={classes.root}>
      <div className={classes.side}>
        <MiniBar title={title} buttons={[["Do", getValue ? onDo : false]]} />
        <MonacoEditor
          theme="light"
          language={props.language}
          onReady={getValue => setGetValue({ fn: getValue })}
          options={textEditorOpts}
          width={textareaSize.width}
          height={textareaSize.height}
          markers={markers}
        />
      </div>
      <div className={classes.side}>{result ? render(result) : null}</div>
      <div className={classes.clear}></div>
    </div>
  );
}
