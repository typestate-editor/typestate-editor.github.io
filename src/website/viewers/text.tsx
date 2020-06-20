import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useCopy } from "../utils";
import MiniBar from "../mini-bar";

const useStyles = makeStyles(() => ({
  root: {
    display: "block",
  },
  pre: {
    width: "600px",
    height: "550px",
    overflow: "auto",
    border: "1px solid lightgray",
    margin: "0px",
    fontSize: "16px",
  },
}));

export type TextViewerProps = {
  data: string;
};

export default function TextViewer(props: TextViewerProps) {
  const classes = useStyles();
  const { data } = props;
  const copy = useCopy();

  return (
    <div className={classes.root}>
      <MiniBar title={null} buttons={[["Copy text", () => copy(data)]]} />
      <div>
        <pre className={classes.pre}>{data}</pre>
      </div>
    </div>
  );
}
