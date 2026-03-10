import type { StageInstrutctions } from "@Models/GamePlay.type";
import { testStage } from "./TestStage";

export const StageDictionary:Record<number, StageInstrutctions> = {
    0: testStage
}