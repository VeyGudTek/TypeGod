import type { SceneName } from "@Models/Enums";
import type { ImageDataPair } from "@Models/Image.type";

import splashLeftSource from "@Assets/Images/splashLeft.png";
import splashRightSource from "@Assets/Images/splashRight.png";

export type MiscSceneNames = Exclude<SceneName, "cutscene" | "level">;

export const miscImageDictionary:Record<MiscSceneNames, Record<string, ImageDataPair>> = {
    "start":{
        "left": {src: splashLeftSource, image: new Image()},
        "right": {src: splashRightSource, image: new Image()}
    },
    "home": {},
    "results": {},
}