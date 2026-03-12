export type User = Record<CharacterIndex, CharacterData>;

export type CharacterIndex = "main";

export interface CharacterData{
    level:number;
    health:number;
    damage:number;
    mana:number;
    experience:number;
}