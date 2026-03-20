import type { CharacterIndex } from "./Enums.type";

export type User = Record<CharacterIndex, CharacterData>;

export interface CharacterData{
    level:number;
    health:number;
    damage:number;
    mana:number;
    experience:number;
    levelUps:number;
}