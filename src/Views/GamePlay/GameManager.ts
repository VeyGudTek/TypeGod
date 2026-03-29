import type { StageIndex, BasicCallback } from "@Models/.";
import { BaseView } from "@Views/Shared";
import { EnemyManager } from "./EnemyManager";
import { Typer } from "./Typer";
import { CharacterManager } from "./CharacterManager";

export class GameManager extends BaseView{
    GameEnded:boolean = false;

    CharacterManager:CharacterManager;
    EnemyManager:EnemyManager;
    Typer:Typer;

    OnGameEnd:BasicCallback;
    
    constructor(stageIndex:StageIndex, onGameEnd:BasicCallback){
        super();

        this.OnGameEnd = onGameEnd;
        
        this.CharacterManager = new CharacterManager((damage, type) => this.EnemyManager.DamageEnemies(damage, type));
        this.EnemyManager = new EnemyManager(stageIndex, () => this.CharacterManager.GetFirstCharacter());
        this.Typer = new Typer((points) => this.CharacterManager.TriggerWordComplete(points));

        this.Children.push(this.CharacterManager, this.EnemyManager, this.Typer);
    }

    OnUpdate(){
        if (!this.GameEnded && this.EnemyManager.CheckGameEnded()){
            this.GameEnded = true;
            this.OnGameEnd();
        }
        else if (!this.GameEnded && this.CharacterManager.CheckGameOver()){
            this.GameEnded = true;
            this.OnGameEnd();
        }
    }
}