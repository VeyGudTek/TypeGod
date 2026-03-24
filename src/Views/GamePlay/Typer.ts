import type { NumberInputCallback } from "@Models/Callbacks.type";
import { wordList } from "@Static/index";
import { BaseView, Panel } from "@Views/Shared";
import { Prompt } from "./Prompt";
import { PromptMerger } from "./PromptMerger";

function GetRandomWord(){
    const listLength = wordList.length;
    const index = Math.floor(Math.random() * listLength)
    return wordList[index];
}

export class Typer extends BaseView{
    Prompt:string[] = [];
    CurrentInput = "";

    OnWordComplete:NumberInputCallback;

    PromptUIList:Prompt[] = [];
    PromptMerger:PromptMerger;

    constructor(onWordComplete:NumberInputCallback){
        super();
        this.OnWordComplete = onWordComplete;
        
        this.PromptMerger = new PromptMerger();
        this.InitializePrompt();
        this.CreateChildren();
    }

    private InitializePrompt(){
        this.Prompt = ["", ""];

        for (let i = 2; i < 5; i++){
            this.Prompt.push(GetRandomWord());
        }
    }

    private CreateChildren(){
        const promptUI1 = new Prompt(this.Prompt[0], "");
        const promptUI2 = new Prompt(this.Prompt[1], "");
        const promptUI3 = new Prompt(this.Prompt[2], "");
        const promptUI4 = new Prompt(this.Prompt[3], "");
        const promptUI5 = new Prompt(this.Prompt[4], "");
        this.PromptUIList.push(promptUI1, promptUI2, promptUI3, promptUI4, promptUI5);

        const backPanel = new Panel({x:.75, y: .1}, {x: .5, y: .1});
        this.PromptMerger.UpdatePrompt(this.PromptUIList);

        this.Children.push(backPanel, this.PromptMerger);
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

        this.PromptMerger.UpdatePrompt(this.PromptUIList);
    }

    private CompleteWord(currentPrompt:Prompt){
        const { correctText } = currentPrompt.GetText();
        this.OnWordComplete(correctText.length * 10);

        this.Prompt = this.Prompt.slice(1);
        this.Prompt.push(GetRandomWord());

        for (let i = 0; i < this.Prompt.length; i++){
            this.PromptUIList[i].Prompt = this.Prompt[i];

            if (i >= 1 && i <= 2){
                this.PromptUIList[i-1].Input = this.PromptUIList[i].Input;
            }
            if (i >= 2){
                this.PromptUIList[i].Input = "";
            }
        }

        this.CurrentInput = "";
        this.PromptMerger.UpdatePrompt(this.PromptUIList);
    }
}