import type { CharacterIndex } from "./User.type";
import type { Vector2 } from "./Vector2.type";

export type StageDictionary = Record<StageIndex, StageInstructions>;

export type StageIndex = "0"
export type StageInstructions = SpawnInstruction[];

export interface SpawnInstruction extends EnemyData{
    time: number;
}

export interface EnemyData{
    health: number;
    cooldown:number;
    damage: number;
    speed: number;
    texture: string;
}

export type CharacterPositionDictionary = Record<CharacterIndex, Vector2>;