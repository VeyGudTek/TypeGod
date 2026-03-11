import type { OnWordCompleteCallback } from "@Models/Callbacks.type";
import { wordList } from "@Static/index";
import { BaseView, Panel } from "@Views/Shared";
import { Prompt } from "./Prompt";

export class Typer extends BaseView{
    Prompt:string[] = [];
    CurrentInput = "";

    OnWordComplete:OnWordCompleteCallback;

    PromptUIList:Prompt[] = [];

    constructor(onWordComplete:OnWordCompleteCallback){
        super();
        this.OnWordComplete = onWordComplete;

        this.InitializePrompt();
        this.BuildUI();
    }

    private InitializePrompt(){
        this.Prompt = ["", ""];
        const listLength = wordList.length;

        for (let i = 2; i < 5; i++){
            const index = Math.floor(Math.random() * listLength);
            this.Prompt.push(wordList[index]);
        }
    }

    private BuildUI(){
        const backPanel = new Panel({x:.75, y: .1}, {x: .5, y: .1});

        const promptUI1 = new Prompt({x:.5, y: .05}, {x:.5, y: .1}, this.Prompt[0], "");
        const promptUI2 = new Prompt({x:.5, y: .05}, {x:.5, y: .1}, this.Prompt[1], "");
        const promptUI3 = new Prompt({x:.5, y: .05}, {x:.5, y: .1}, this.Prompt[2], "");
        const promptUI4 = new Prompt({x:.5, y: .05}, {x:.65, y: .1}, this.Prompt[3], "");
        const promptUI5 = new Prompt({x:.5, y: .05}, {x:.8, y: .1}, this.Prompt[4], "");

        this.PromptUIList.push(promptUI1, promptUI2, promptUI3, promptUI4, promptUI5);
        this.Children.push(backPanel, promptUI1, promptUI2, promptUI3, promptUI4, promptUI5);
    }

    OnKeyDown(input:string){
        if (input.length === 1){
            this.CurrentInput += input;

            if (this.CurrentInput === this.Prompt[2]){
                this.OnWordComplete(this.CurrentInput.length);
            }
            return;
        }

        if (input === "Backspace" && this.CurrentInput.length > 0){
            this.CurrentInput = this.CurrentInput.slice(0, this.CurrentInput.length - 1);
        }
    }
}