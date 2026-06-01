import type { StageInstructions } from "@Models/GamePlay.type";
import { GoblinData } from "./EnemyData";

export const testStage:StageInstructions = [
    {time: 1, ...GoblinData},
    {time: 2, ...GoblinData},
    {time: 3, ...GoblinData},
    {time: 4, ...GoblinData},
];