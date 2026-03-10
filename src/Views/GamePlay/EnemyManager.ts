import type { EnemyData, StageIndex, StageInstructions } from "@Models/GamePlay.type";
import { BaseView } from "@Views/Shared";
import { Enemy } from "./Enemy";
import { Timer } from "@Services/index";
import { stageDictionary } from "@Static/Stages";

export class EnemyManager extends BaseView{
    CurrentStageInstructions:StageInstructions;
    Timer:Timer = new Timer();

    constructor(stageIndex:StageIndex){
        super();

        this.CurrentStageInstructions = stageDictionary[stageIndex].sort((a, b) => a.time - b.time);
    }

    OnUpdate(){
        if (this.CurrentStageInstructions.length > 0 && this.Timer.GetElapsedTime() > this.CurrentStageInstructions[0].time){
            this.SpawnEnemy(this.CurrentStageInstructions[0]);
            this.CurrentStageInstructions.splice(0, 1);
        }
    }

    private SpawnEnemy(data:EnemyData){
        const newEnemy = new Enemy({x: .1, y: .1}, {x:.9, y: Math.random()}, data);
        this.Children.push(newEnemy);
    }

    CheckGameEnded(){
        return this.CurrentStageInstructions.length === 0 && this.Children.length === 0;
    }
}