import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  createAutomaton,
  parse,
  astToAutomaton,
  automatonToAst,
  generator,
} from "../tool";
import { Automaton } from "../tool/automaton_types";
import AppBar from "./app-bar";
import { navItems } from "./app-bar/nav-menu";
import Transformer from "./transformer";
import AutomatonViewer from "./viewers/automaton";
import JsonViewer from "./viewers/json";
import TextViewer from "./viewers/text";
import { SnackbarProvider } from "notistack";
import { fixAutomaton, fixAutomaton2 } from "./utils";

const transforms = {
  view: (text: string) => createAutomaton(text),
  parse: (text: string) => parse(text),
  astToAutomaton: (ast: string) =>
    fixAutomaton(astToAutomaton(JSON.parse(ast))),
  automatonToAst: (automaton: string) =>
    automatonToAst("NAME", fixAutomaton2(JSON.parse(automaton))),
  generator: (ast: string) => generator(JSON.parse(ast)),
};

const renders = {
  view: (data: Automaton) => <AutomatonViewer data={data}></AutomatonViewer>,
  parse: (data: unknown) => <JsonViewer data={data}></JsonViewer>,
  astToAutomaton: (data: unknown) => <JsonViewer data={data}></JsonViewer>,
  automatonToAst: (data: unknown) => <JsonViewer data={data}></JsonViewer>,
  generator: (data: string) => <TextViewer data={data}></TextViewer>,
};

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(16),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <SnackbarProvider>
      <AppBar />
      <Container className={classes.container}>
        <div id={navItems[0][1]}></div>
        <Transformer
          title={navItems[0][0]}
          language="typestate"
          fn={transforms.view}
          render={renders.view}
        ></Transformer>
        <div id={navItems[1][1]}></div>
        <Transformer
          title={navItems[1][0]}
          language="typestate"
          fn={transforms.parse}
          render={renders.parse}
        ></Transformer>
        <div id={navItems[2][1]}></div>
        <Transformer
          title={navItems[2][0]}
          language="json"
          fn={transforms.astToAutomaton}
          render={renders.astToAutomaton}
        ></Transformer>
        <div id={navItems[3][1]}></div>
        <Transformer
          title={navItems[3][0]}
          language="json"
          fn={transforms.automatonToAst}
          render={renders.automatonToAst}
        ></Transformer>
        <div id={navItems[4][1]}></div>
        <Transformer
          title={navItems[4][0]}
          language="json"
          fn={transforms.generator}
          render={renders.generator}
        ></Transformer>
      </Container>
    </SnackbarProvider>
  );
};
