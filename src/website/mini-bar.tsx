import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
  },
  toolbar: {
    "& > *": {
      float: "left",
      margin: theme.spacing(2),
    },
  },
  clear: {
    clear: "both",
  },
}));

export type MiniBarProps = {
  title: string | null;
  buttons: [string, false | (() => void)][];
};

export default function MiniBar(props: MiniBarProps) {
  const classes = useStyles();
  const { title, buttons } = props;

  return (
    <>
      <div className={classes.toolbar}>
        {title ? <Typography variant="h6">{title}</Typography> : null}
        {buttons.map(([text, fn], idx) => (
          <Button
            key={idx}
            variant="outlined"
            disabled={fn === false}
            onClick={fn === false ? undefined : fn}
          >
            {text}
          </Button>
        ))}
      </div>
      <div className={classes.clear}></div>
    </>
  );
}
