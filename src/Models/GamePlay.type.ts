export type StageDictionary = Record<StageIndex, StageInstrutctions>;

export type StageIndex = "0"
export type StageInstrutctions = SpawnInstruction[];

export interface SpawnInstruction extends EnemyData{
    time: number;
}

export interface EnemyData{
    health: number;
    damage: number;
    speed: number;
    texture: string;
}