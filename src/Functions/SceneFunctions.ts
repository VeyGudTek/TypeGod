import type { BasicCallback } from "@Models/Callbacks.type";

export function StartPicker(newGame:boolean, LoadCutscene:BasicCallback, LoadHome:BasicCallback){
    if (newGame){
        LoadCutscene();
    }
    else{
        LoadHome();
    }
}