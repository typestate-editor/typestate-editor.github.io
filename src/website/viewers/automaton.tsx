import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Automaton } from "../../tool/automaton_types";
import { useCopy } from "../utils";
import MiniBar from "../mini-bar";
import { fixAutomaton } from "../utils";

function createNetwork(automaton: Automaton, container: HTMLDivElement) {
  const vis = typeof window === "undefined" ? null : (window as any).vis;
  if (!vis) return null;
  const Network = vis.Network;
  const DataSet = vis.DataSet;

  const invisible = ":invisible:";

  const nodes: any[] /*: vis.Node[]*/ = [
    {
      id: invisible,
      size: 0,
      borderWidth: 0,
      color: {
        border: "rgba(0,0,0,0)",
        background: "rgba(0,0,0,0)",
      },
      label: "",
    },
  ];

  const edges: any[] /*: vis.Edge[]*/ = [
    {
      from: invisible,
      to: automaton.start,
      color: {
        color: "#848484",
      },
      arrows: "to",
      label: "",
    },
  ];

  for (const name of automaton.states) {
    nodes.push({
      id: name,
      label: name,
      shape: "circle",
      borderWidth: automaton.final.has(name) ? 4 : 1,
    });
  }

  for (const name of automaton.choices) {
    nodes.push({
      id: name,
      label: "",
      shape: "diamond",
      borderWidth: 1,
    });
  }

  for (const { from: _from, transition, to } of automaton.mTransitions) {
    edges.push({
      from: _from,
      to,
      arrows: "to",
      label: `${transition.name}(${transition.arguments.join(", ")})`,
    });
  }

  for (const { from: _from, transition, to } of automaton.lTransitions) {
    edges.push({
      from: _from,
      to,
      arrows: "to",
      label: transition.name,
    });
  }

  const maxNodeLabelSize = nodes.reduce(
    (acc: number, node: any) => Math.max(node.label.length, acc),
    0
  );

  const maxEdgeLabelSize = edges.reduce(
    (acc: number, edge: any) => Math.max(edge.label.length, acc),
    0
  );

  const data /*: { nodes: vis.DataSet; edges: vis.DataSet }*/ = {
    nodes: new DataSet(nodes),
    edges: new DataSet(edges),
  };

  const options = {
    layout: {
      // randomSeed: 293814 // network.getSeed()
    },
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" },
        middle: { enabled: false, scaleFactor: 1, type: "arrow" },
        from: { enabled: false, scaleFactor: 1, type: "arrow" },
      },
      font: {
        align: "top",
      },
    },
    physics: {
      enabled: true,
      solver: "repulsion",
      repulsion: {
        centralGravity: 0,
        springLength: maxEdgeLabelSize * 5 + maxNodeLabelSize * 5 + 100,
      },
    },
  };

  const network /*: vis.Network*/ = new Network(container, data, options);

  if (location.hash === "#forcewhite") {
    // https://github.com/almende/vis/issues/2292
    network.on("beforeDrawing", (ctx: any) => {
      // save current translate/zoom
      ctx.save();
      // reset transform to identity
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // fill background with solid white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // restore old transform
      ctx.restore();
    });
  }

  return network;
}

const useStyles = makeStyles(() => ({
  root: {
    display: "block",
  },
  container: {
    width: "700px",
    height: "700px",
    border: "1px solid lightgray",
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

export type AutomatonViewerProps = {
  data: Automaton;
};

export default function AutomatonViewer(props: AutomatonViewerProps) {
  const classes = useStyles();
  const { data } = props;
  const container = useRef<HTMLDivElement>(null);
  const [network, setNetwork] = useState<any>(null);
  const copy = useCopy();

  useEffect(() => {
    setNetwork(createNetwork(data, container.current!));
  }, [data]);

  function download() {
    const anchor = document.createElement("a");
    anchor.download = "automaton.png";
    anchor.href = container
      .current!.querySelector("canvas")!
      .toDataURL("image/png");
    anchor.click();
  }

  return (
    <div className={classes.root}>
      <MiniBar
        title={null}
        buttons={[
          ["Download", download],
          [
            "Copy automaton in JSON",
            () => copy(JSON.stringify(fixAutomaton(data), null, 2)),
          ],
        ]}
      />
      <div className={classes.container} ref={container}></div>
    </div>
  );
}
