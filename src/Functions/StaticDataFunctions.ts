import type { CharacterIndex } from "@Models/Enums.type";

export function GetMaxExperience(level:number){
    return level * 100;
}

export function GetCharacterUIPosition(characterCount:number, index:CharacterIndex){
    //Implement when adding more characters.
    return {x:.5, y:.9};
}