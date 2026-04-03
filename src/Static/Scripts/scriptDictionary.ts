import type { ScriptIndex, Script, StageIndex } from "@Models/.";
import { testScript } from "./testScript";

export const scriptCutsceneDictionary:Record<StageIndex, ScriptIndex> = {
    "0":"0"
}

export const scriptDictionary:Record<ScriptIndex, Script> = {
    "0":testScript,
}