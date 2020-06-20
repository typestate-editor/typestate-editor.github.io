import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import type JSONEditor from "jsoneditor";
import { useCopy } from "../utils";
import MiniBar from "../mini-bar";

const useStyles = makeStyles(() => ({
  root: {
    display: "block",
  },
  container: {
    width: "600px",
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

export type JsonViewerProps = {
  data: unknown;
};

export default function JsonViewer(props: JsonViewerProps) {
  const classes = useStyles();
  const { data } = props;
  const container = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<JSONEditor | null>(null);
  const copy = useCopy();

  useEffect(() => {
    if (editor == null) {
      const JSONEditor =
        typeof window === "undefined" ? null : (window as any).JSONEditor;
      if (!JSONEditor) return;
      const editor: JSONEditor = new JSONEditor(container.current, {
        mode: "view",
      });
      setEditor(editor);
      editor.set(data);
    } else {
      editor.set(data);
    }
  }, [data]);

  return (
    <div className={classes.root}>
      <MiniBar
        title={null}
        buttons={[["Copy JSON", () => copy(JSON.stringify(data, null, 2))]]}
      />
      <div className={classes.container} ref={container}></div>
    </div>
  );
}
