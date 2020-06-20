import { useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import copyToClipboard from "copy-to-clipboard";
import { Automaton } from "../tool/automaton_types";

// Convert sets in arrays
export function fixAutomaton(a: Automaton) {
  return {
    ...a,
    states: Array.from(a.states),
    choices: Array.from(a.choices),
    final: Array.from(a.final),
  };
}

// Convert arrays in sets
export function fixAutomaton2(a: ReturnType<typeof fixAutomaton>): Automaton {
  return {
    ...a,
    states: new Set(a.states),
    choices: new Set(a.choices),
    final: new Set(a.final),
  };
}

const offset = 64 + 8;

export function jump(id: string) {
  const elem = document.getElementById(id);
  if (elem) {
    const y = elem.getBoundingClientRect().top + window.pageYOffset - offset;
    try {
      window.scrollTo({ top: y, behavior: "smooth" });
    } catch (err) {
      window.scrollTo(0, y);
    }
  }
}

async function copy(text: string) {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    navigator.clipboard.writeText
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.log("Copy error", err);
      return copyToClipboard(text);
    }
  } else {
    return copyToClipboard(text);
  }
}

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useCopy() {
  const { enqueueSnackbar } = useSnackbar();

  return async (data: string, message: string = "Copied!") => {
    const success = await copy(data);
    if (success) {
      enqueueSnackbar(message, { variant: "default" });
    } else {
      enqueueSnackbar("Could not copy to clipboard", {
        variant: "error",
      });
    }
  };
}
