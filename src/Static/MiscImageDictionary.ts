import type { SceneName } from "@Models/Enums";
import type { ImageDataPair } from "@Models/Image.type";

export type MiscSceneNames = Exclude<SceneName, "cutscene" | "level">;

export const miscImageDictionary:Record<MiscSceneNames, ImageDataPair[]> = {
    "start":[],
    "home": [],
    "results": [],
}