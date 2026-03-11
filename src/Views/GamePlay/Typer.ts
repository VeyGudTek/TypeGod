import type { OnWordCompleteCallback } from "@Models/Callbacks.type";
import { wordList } from "@Static/index";
import { BaseView, Panel } from "@Views/Shared";
import { Prompt } from "./Prompt";

function GetRandomWord(){
    const listLength = wordList.length;
    const index = Math.floor(Math.random() * listLength)
    return wordList[index];
}

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

        for (let i = 2; i < 5; i++){
            this.Prompt.push(GetRandomWord());
        }
    }

    private BuildUI(){
        const backPanel = new Panel({x:.75, y: .1}, {x: .5, y: .1});

        const promptUI1 = new Prompt({x:.5, y: .05}, {x:.2, y: .1}, this.Prompt[0], "");
        const promptUI2 = new Prompt({x:.5, y: .05}, {x:.35, y: .1}, this.Prompt[1], "");
        const promptUI3 = new Prompt({x:.5, y: .05}, {x:.5, y: .1}, this.Prompt[2], "");
        const promptUI4 = new Prompt({x:.5, y: .05}, {x:.65, y: .1}, this.Prompt[3], "");
        const promptUI5 = new Prompt({x:.5, y: .05}, {x:.8, y: .1}, this.Prompt[4], "");

        this.PromptUIList.push(promptUI1, promptUI2, promptUI3, promptUI4, promptUI5);
        this.Children.push(backPanel, promptUI1, promptUI2, promptUI3, promptUI4, promptUI5);
    }

    OnKey(input:string){
        if (input.length === 1){
            this.CurrentInput += input;
        }

        if (input === "Backspace" && this.CurrentInput.length > 0){
            this.CurrentInput = this.CurrentInput.slice(0, this.CurrentInput.length - 1);
        }

        const currentPrompt = this.PromptUIList[2];
        currentPrompt.Input = this.CurrentInput;
        
        if (this.CurrentInput.length > currentPrompt.Prompt.length && input === " "){
            this.CompleteWord(currentPrompt);
        }
    }

    private CompleteWord(currentPrompt:Prompt){
        const { correctText } = currentPrompt.GetText();
        this.OnWordComplete(correctText.length);

        this.Prompt = this.Prompt.slice(1);
        this.Prompt.push(GetRandomWord());

        for (let i = 0; i < this.Prompt.length; i++){
            this.PromptUIList[i].Prompt = this.Prompt[i];
            this.PromptUIList[i].Input = "";
        }
        
        this.PromptUIList[1].Input = this.CurrentInput;
        this.CurrentInput = "";
    }
}