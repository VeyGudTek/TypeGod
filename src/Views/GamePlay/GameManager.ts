import type { StageIndex } from "@Models/GamePlay.type";
import { BaseView } from "@Views/Shared";
import { EnemyManager } from "./EnemyManager";

export class GameManager extends BaseView{
    EnemyManager:EnemyManager;
    
    constructor(stageIndex:StageIndex){
        super();
        
        this.EnemyManager = new EnemyManager(stageIndex);
        this.Children.push(this.EnemyManager);
    }

    OnUpdate(){

    }
}