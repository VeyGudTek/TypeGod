import type { BasicCallback, ScriptIndex, StageIndex } from "@Models/.";

export function StartPicker(newGame:boolean, LoadCutscene:BasicCallback, LoadHome:BasicCallback){
    if (newGame){
        LoadCutscene();
    }
    else{
        LoadHome();
    }
}

export function CutScenePicker(scriptIndex:ScriptIndex, LoadHome:BasicCallback, LoadLevel:BasicCallback){
    LoadLevel();
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