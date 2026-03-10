import type { StageInstrutctions } from "@Models/GamePlay.type";
import { testBaseEnemyData } from "./EnemyData";

export const testStage:StageInstrutctions = [
    {time: 1, ...testBaseEnemyData},
    {time: 2, ...testBaseEnemyData},
    {time: 3, ...testBaseEnemyData},
    {time: 4, ...testBaseEnemyData},
];