import type { BasicCallback } from "@Models/Callbacks.type";
import type { StageIndex } from "@Models/Enums.type";

export function StartPicker(newGame:boolean, LoadCutscene:BasicCallback, LoadHome:BasicCallback){
    if (newGame){
        LoadCutscene();
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