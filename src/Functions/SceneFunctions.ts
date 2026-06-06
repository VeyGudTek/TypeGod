import type { BasicCallback, ScriptIndex, StageIndex } from "@Models/.";
import { scriptEndToStageDictionary } from "@Static/SceneDictionaries";

export function LoadPrologueOrHome(newGame:boolean, LoadCutscene:BasicCallback, LoadHome:BasicCallback){
    if (newGame){
        LoadCutscene();
    }
    else{
        LoadHome();
    }
}

export function LoadLevelOrHome(scriptIndex:ScriptIndex, LoadHome:BasicCallback, LoadLevel:(index:StageIndex) => void){
    if (Object.keys(scriptEndToStageDictionary).includes(scriptIndex)){
        LoadLevel(scriptEndToStageDictionary[scriptIndex] as StageIndex);
    }
    else{
        LoadHome();
    }
}
