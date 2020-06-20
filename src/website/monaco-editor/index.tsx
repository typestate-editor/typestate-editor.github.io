import React, { useState, useEffect, useRef, useCallback } from "react";
import type MonacoEditorType from "monaco-editor";
import MonacoContainer from "./container";
import monaco, {
  MonacoNamespace,
  MonacoEditor,
  MonacoOptions,
  MonacoServices,
} from "./monaco";

const nightDarkTheme: MonacoEditorType.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#202124",
  },
};

const emptyArr = [] as const;

const useMount = (effect: React.EffectCallback) => useEffect(effect, emptyArr);

const useUpdate = (
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  applyChanges = true
) => {
  const isInitialMount = useRef(true);

  useEffect(
    isInitialMount.current || !applyChanges
      ? () => {
          isInitialMount.current = false;
        }
      : effect,
    deps
  );
};

export type EditorProps = {
  language: string;
  onReady: (getValue: () => string) => void;
  theme?: string;
  width?: number | string;
  height?: number | string;
  loading?: JSX.Element | string;
  options?: MonacoOptions;
  overrideServices?: MonacoServices;
  markers?: MonacoEditorType.editor.IMarkerData[];
};

const Editor = ({
  language,
  onReady,
  theme = "light",
  width = "100%",
  height = "100%",
  loading = "Loading...",
  options = {},
  overrideServices = {},
  markers = [],
}: EditorProps) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isMonacoMounting, setIsMonacoMounting] = useState(true);
  const editorRef = useRef<MonacoEditor>();
  const monacoRef = useRef<MonacoNamespace>();
  const containerRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    const cancelable = monaco.init();

    cancelable.promise
      .then(
        monaco => (monacoRef.current = monaco) && setIsMonacoMounting(false)
      )
      .catch(error =>
        console.error(
          "An error occurred during initialization of Monaco:",
          error
        )
      );

    return () =>
      editorRef.current ? editorRef.current.dispose() : cancelable.cancel();
  });

  /*useUpdate(
    () => {
      if (options.readOnly) {
        editorRef.current.setValue(value);
      } else {
        editorRef.current.executeEdits("", [
          {
            range: editorRef.current.getModel().getFullModelRange(),
            text: value,
          },
        ]);

        if (_isControlledMode) {
          const model = editorRef.current.getModel();
          model.forceTokenization(model.getLineCount());
        }

        editorRef.current.pushUndoStop();
      }
    },
    [value],
    isEditorReady
  );*/

  useUpdate(
    () => {
      monacoRef.current!.editor.setModelLanguage(
        editorRef.current!.getModel()!,
        language
      );
    },
    [language],
    isEditorReady
  );

  /*useUpdate(
    () => {
      editorRef.current.setScrollPosition({ scrollTop: line });
    },
    [line],
    isEditorReady
  );*/

  useUpdate(
    () => {
      monacoRef.current!.editor.setTheme(theme);
    },
    [theme],
    isEditorReady
  );

  useUpdate(
    () => {
      editorRef.current!.updateOptions(options);
    },
    [options],
    isEditorReady
  );

  useUpdate(
    () => {
      const model = editorRef.current!.getModel()!;
      monacoRef.current!.editor.setModelMarkers(model, "owner", markers);
    },
    [markers],
    isEditorReady
  );

  const createEditor = useCallback(() => {
    editorRef.current = monacoRef.current!.editor.create(
      containerRef.current!,
      {
        value: "",
        language,
        automaticLayout: true,
        ...options,
      },
      overrideServices
    );

    onReady(editorRef.current.getValue.bind(editorRef.current));

    monacoRef.current!.editor.defineTheme("dark", nightDarkTheme);
    monacoRef.current!.editor.setTheme(theme);

    setIsEditorReady(true);
  }, [language, options, overrideServices, theme]);

  useEffect(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);

  return (
    <MonacoContainer
      width={width}
      height={height}
      isEditorReady={isEditorReady}
      loading={loading}
      refDiv={containerRef}
    />
  );
};

export default Editor;
