import type { ScriptIndex, Script } from "@Models/.";
import { testScript } from "./testScript";

export const scriptDictionary:Record<ScriptIndex, Script> = {
    "0":testScript,
}