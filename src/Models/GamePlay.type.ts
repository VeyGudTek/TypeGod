import type { StageIndex } from "./Enums.type";

export type StageDictionary = Record<StageIndex, StageInstructions>;

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
