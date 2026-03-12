import type { EnemyData, StageIndex, StageInstructions } from "@Models/GamePlay.type";
import { BaseView } from "@Views/Shared";
import { Enemy } from "./Enemy";
import { Timer } from "@Services/index";
import { stageDictionary } from "@Static/Stages";

export class EnemyManager extends BaseView{
    CurrentStageInstructions:StageInstructions;
    Enemies:Enemy[] = [];
    Timer:Timer = new Timer();

    GetFirstPlayerPosition:() => number;

    constructor(stageIndex:StageIndex, getFirstPlayerPosition:() => number){
        super();
        
        this.CurrentStageInstructions = stageDictionary[stageIndex].sort((a, b) => a.time - b.time);
        this.Children = this.Enemies;
        this.GetFirstPlayerPosition = getFirstPlayerPosition;
    }

    OnUpdate(){
        if (this.CurrentStageInstructions.length > 0 && this.Timer.GetElapsedTime() > this.CurrentStageInstructions[0].time){
            this.SpawnEnemy(this.CurrentStageInstructions[0]);
            this.CurrentStageInstructions.splice(0, 1);
        }
    }

    private SpawnEnemy(data:EnemyData){
        const newEnemy = new Enemy({x: .1, y: .1}, {x:.9, y: Math.random()}, data);
        this.Enemies.push(newEnemy);
    }

    DamageEnemies(damage:number){
        this.Enemies.forEach((enemy) => {
            enemy.TakeDamage(damage);
        });
    }

    CheckGameEnded(){
        return this.CurrentStageInstructions.length === 0 && this.Children.length === 0;
    }
}