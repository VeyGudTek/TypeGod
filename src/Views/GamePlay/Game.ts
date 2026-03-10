import type { StageIndex, StageInstrutctions } from "@Models/GamePlay.type";
import { Timer } from "@Services/index";
import { WordList } from "@Static/index";
import { StageDictionary } from "@Static/Stages";
import { BaseView } from "@Views/Shared";

export class GameManager extends BaseView{
    Playing:boolean = false;
    CurrentStageInstructions:StageInstrutctions = [];
    
    Prompt:string[] = [];
    CurrentInput = "";

    Timer:Timer = new Timer();
    
    constructor(stage:StageIndex){
        super();
        
        this.CurrentStageInstructions = StageDictionary[stage];
        this.Playing = true;
        this.Timer.Reset();
        this.InitializePrompt();
    }

    private InitializePrompt(){
        this.Prompt = [];
        const listLength = WordList.length;

        for (let i = 0; i < 5; i++){
            const index = Math.floor(Math.random() * listLength);
            this.Prompt.push(WordList[index]);
        }
    }

    OnUpdate(){

    }

    OnKeyDown(input:string){
        if (input.length === 1){
            this.CurrentInput += input;
            return;
        }
        if (input === "Backspace" && this.CurrentInput.length > 0){
            this.CurrentInput = this.CurrentInput.slice(0, this.CurrentInput.length - 1);
        }
    }
}