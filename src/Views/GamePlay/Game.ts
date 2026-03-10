import type { StageIndex, StageInstructions } from "@Models/GamePlay.type";
import { Timer } from "@Services/index";
import { stageDictionary } from "@Static/Stages";
import { BaseView } from "@Views/Shared";

export class GameManager extends BaseView{
    Playing:boolean = false;
    CurrentStageInstructions:StageInstructions = [];

    Timer:Timer = new Timer();
    
    constructor(stage:StageIndex){
        super();
        
        this.CurrentStageInstructions = stageDictionary[stage];
        this.Playing = true;
        this.Timer.Reset();
    }

    OnUpdate(){

    }
}