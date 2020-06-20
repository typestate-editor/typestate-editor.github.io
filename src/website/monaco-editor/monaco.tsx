import type MonacoEditorType from "monaco-editor";
import { registerTypestateLang } from "../languages";

export type MonacoNamespace = typeof MonacoEditorType;
export type MonacoEditorNamespace = typeof MonacoEditorType.editor;
export type MonacoEditor = MonacoEditorType.editor.IStandaloneCodeEditor;
export type MonacoOptions = MonacoEditorType.editor.IEditorOptions &
  MonacoEditorType.editor.IGlobalEditorOptions;
export type MonacoServices = MonacoEditorType.editor.IEditorOverrideServices;

const config = {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min/vs",
  },
} as const;

const noop = () => {};

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason: Error) => void;
  cancel: () => void;
};

function defer<T>(): Deferred<T> {
  let resolve: Deferred<T>["resolve"] = noop;
  let reject: Deferred<T>["reject"] = noop;
  const promise = new Promise<T>((a, b) => {
    resolve = a;
    reject = b;
  });

  const cancel = () => {
    reject(new Error("Promise cancelled"));
  };

  return {
    promise,
    resolve,
    reject,
    cancel,
  };
}

const getMonaco = () => (window as any).monaco as MonacoNamespace | undefined;

class Monaco {
  private isInitialized: boolean;
  private deferred: Deferred<MonacoNamespace>;

  constructor() {
    this.isInitialized = false;
    this.deferred = defer<MonacoNamespace>();
  }

  private injectScripts(script: HTMLScriptElement) {
    document.body.appendChild(script);
  }

  private handleMainScriptLoad = () => {
    document.removeEventListener("monaco_init", this.handleMainScriptLoad);
    if (!this.prepareMonaco()) {
      this.deferred.reject(new Error("Could not load monaco-editor"));
    }
  };

  private createScript(src?: string) {
    const script = document.createElement("script");
    if (src) {
      script.src = src;
    }
    return script;
  }

  private createMonacoLoaderScript(mainScript: HTMLScriptElement) {
    const loaderScript = this.createScript(`${config.paths.vs}/loader.js`);
    loaderScript.onload = () => this.injectScripts(mainScript);
    loaderScript.onerror = err => {
      console.error(err);
      this.deferred.reject(
        new Error(`Error loading ${config.paths.vs}/loader.js`)
      );
    };
    return loaderScript;
  }

  private createMainScript() {
    const mainScript = this.createScript();
    mainScript.innerHTML = `
      require.config(${JSON.stringify(config)});
      require(['vs/editor/editor.main'], function() {
        document.dispatchEvent(new Event('monaco_init'));
      });
    `;
    mainScript.onerror = err => {
      console.error(err);
      this.deferred.reject(new Error(`Error creating main script`));
    };
    return mainScript;
  }

  private prepareMonaco() {
    const maybeMonaco = getMonaco();
    if (maybeMonaco) {
      try {
        registerTypestateLang(maybeMonaco);
        this.deferred.resolve(maybeMonaco);
      } catch (err) {
        this.deferred.reject(err);
      }
      return true;
    }
    return false;
  }

  init() {
    if (!this.isInitialized) {
      if (!this.prepareMonaco()) {
        document.addEventListener("monaco_init", this.handleMainScriptLoad);
        const mainScript = this.createMainScript();
        const loaderScript = this.createMonacoLoaderScript(mainScript);
        this.injectScripts(loaderScript);
      }
    }

    this.isInitialized = true;
    return this.deferred;
  }
}

export default new Monaco();
