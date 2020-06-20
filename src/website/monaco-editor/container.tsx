import React from "react";

export type MonacoContainerProps = {
  width: number | string;
  height: number | string;
  loading: JSX.Element | string;
  isEditorReady: boolean;
  refDiv: React.ClassAttributes<HTMLDivElement>["ref"];
};

const styles = {
  wrapper: {
    display: "flex",
    position: "relative",
    textAlign: "initial",
    border: "1px solid lightgray",
  },
  full: {
    width: "100%",
    height: "100%",
  },
  hide: {
    display: "none",
  },
} as const;

const loadingStyles = {
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
} as const;

export default function MonacoContainer({
  width,
  height,
  isEditorReady,
  loading,
  refDiv,
}: MonacoContainerProps) {
  return (
    <div style={{ ...styles.wrapper, width, height }}>
      {!isEditorReady && <div style={loadingStyles}>{loading}</div>}
      <div
        ref={refDiv}
        style={{ ...styles.full, ...(!isEditorReady && styles.hide) }}
      />
    </div>
  );
}
