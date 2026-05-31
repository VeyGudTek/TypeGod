import type { ScriptIndex, StageIndex } from "@Models/index"

export const stageStartToScriptDictionary:Record<StageIndex, ScriptIndex> = {
    "1": "levelOneStart"
}

export const stageEndToScriptDictionary:Record<StageIndex, ScriptIndex> = {
    "1": "levelOneEnd"
}

export const scriptEndToStageDictionary:Partial<Record<ScriptIndex, StageIndex>> = {
    "levelOneStart": "1"
}