import type { CharacterIndex, StageIndex, Vector2 } from "@Models/.";

export const characterGameplayPositionDictionary:Record<CharacterIndex, Vector2> = {
    "main": {x: .1, y:.6}
}

export const characterUIOrderDictionary:Record<CharacterIndex, number> = {
    "main": 1
}

export const characterButtonPositionDictionary:Record<CharacterIndex, Vector2> = {
    "main": {x: .5, y: .5}
}

export const stageButtonPositionDictionary:Record<StageIndex, Vector2> = {
    "0":{x: .1, y: .4}
}