import { register } from "./typestate";

export type MonacoLanguages = "plaintext" | "json" | "typestate";

export const registerTypestateLang = register;
