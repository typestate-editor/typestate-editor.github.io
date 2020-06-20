import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import NavMenu from "./nav-menu";
import ExamplesMenu from "./examples-menu";

const useAppBarStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  offset: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  white: {
    color: "white",
  },
}));

export type AppBarProps = {};

export default function (props: AppBarProps) {
  const classes = useAppBarStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <NavMenu />
          <Typography variant="h6" className={classes.title}>
            Typestate Editor
          </Typography>
          <ExamplesMenu />
          <a
            href="https://github.com/typestate-editor/typestate-editor.github.io"
            target="_blank"
            rel="noopener"
          >
            <IconButton
              className={classes.white}
              aria-label="GitHub repository"
              component="span"
            >
              <GitHubIcon />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
