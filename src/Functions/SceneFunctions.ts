import type { BasicCallback, ScriptIndex, ScriptWithCutSceneIndex, StageIndex } from "@Models/.";
import { scriptWithCutSceneIndex } from "@Models/.";
import { scriptEndToStageDictionary } from "@Static/SceneDictionaries";

export const isScriptWIthCutScene = (x:any): x is ScriptWithCutSceneIndex => scriptWithCutSceneIndex.includes(x);

export function StartPicker(newGame:boolean, LoadCutscene:BasicCallback, LoadHome:BasicCallback){
    if (newGame){
        LoadCutscene();
    }
    else{
        LoadHome();
    }
}

export function CutScenePicker(scriptIndex:ScriptIndex, LoadHome:BasicCallback, LoadLevel:(index:StageIndex) => void){
    if (isScriptWIthCutScene(scriptIndex)){
        LoadLevel(scriptEndToStageDictionary[scriptIndex]);
    }
    else{
        LoadHome();
    }
}

export function HomePicker(level:StageIndex, LoadCutscene:BasicCallback, LoadLevel:BasicCallback){
    //check user data here

    let hasCompletedLevel = false;
    if (hasCompletedLevel){
        LoadLevel();
    }
    else{
        LoadCutscene();
    }
}