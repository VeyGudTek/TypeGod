import type { ScriptIndex, Script } from "@Models/.";
import { prologue } from "./prologue";
import { testScript } from "./testScript";

export const scriptDictionary:Record<ScriptIndex, Script> = {
    "prologue": prologue,
    "levelOneStart": testScript,
    "levelOneEnd": testScript
}