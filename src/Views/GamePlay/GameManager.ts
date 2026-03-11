import type { StageIndex } from "@Models/GamePlay.type";
import { BaseView } from "@Views/Shared";
import { EnemyManager } from "./EnemyManager";
import { Typer } from "./Typer";

export class GameManager extends BaseView{
    EnemyManager:EnemyManager;
    Typer:Typer;
    
    constructor(stageIndex:StageIndex){
        super();
        
        this.EnemyManager = new EnemyManager(stageIndex);
        this.Typer = new Typer((word) => console.log(word));

        this.Children.push(this.EnemyManager, this.Typer);
    }

    OnUpdate(){

    }
}