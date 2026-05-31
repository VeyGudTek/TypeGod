import type { ScriptIndex, Script } from "@Models/.";
import { prologue } from "./prologue";

export const scriptDictionary:Record<ScriptIndex, Script> = {
    "0": prologue,
}