import type { AttackType, StageIndex, StageInstructions } from "@Models/.";
import { BaseView } from "@Views/Shared";
import { Enemy } from "./Enemy";
import { Timer } from "@Services/index";
import { stageDictionary } from "@Static/GamePlay";
import type { Character } from "./Character";

export class EnemyManager extends BaseView{
    private CurrentStageInstructions:StageInstructions;
    private Enemies:Enemy[] = [];
    private Timer:Timer = new Timer();

    GetFirstCharacter:() => Character | undefined;

    constructor(stageIndex:StageIndex, getFirstCharacter:() => Character | undefined){
        super();
        
        this.CurrentStageInstructions = stageDictionary[stageIndex].sort((a, b) => a.time - b.time);
        this.Children = this.Enemies;
        this.GetFirstCharacter = getFirstCharacter;
    }

    OnUpdate(){
        this.SpawnEnemy();
    }

    private SpawnEnemy(){
        if (this.CurrentStageInstructions.length > 0 && this.Timer.GetElapsedTime() > this.CurrentStageInstructions[0].time){
            const data = this.CurrentStageInstructions[0];

            const yPosition = .3 + (Math.random() * .4)
            const newEnemy = new Enemy({x: .1, y: .1}, {x:.9, y: yPosition}, data, this.GetFirstCharacter);
            this.Enemies.push(newEnemy);
            this.CurrentStageInstructions.splice(0, 1);

            this.Enemies.sort((a, b) => b.Position.x - a.Position.x);
        }
    }

    DamageEnemies(damage:number, type:AttackType){
        const aliveEnemies = this.Enemies.filter(e => !e.Dead);
        if (aliveEnemies.length === 0){
            return;
        }

        if (type === "single"){
            aliveEnemies[aliveEnemies.length - 1].TakeDamage(damage);
        }
        else{
            aliveEnemies.forEach(e => e.TakeDamage(damage));
        }

        this.Enemies.sort((a, b) => {
            if (a.Dead && !b.Dead){
                return -1;
            }
            if (b.Dead && !a.Dead){
                return 1;
            }
            return 0;
        });
    }

    CheckGameEnded(){
        return this.CurrentStageInstructions.length === 0 && this.Enemies.every(e => e.Dead);
    }
}