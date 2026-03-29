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
    private readonly numWords = 13;

    private Prompt:string[] = [];
    private CurrentInput = "";

    private OnWordComplete:NumberInputCallback;

    private PromptUIList:Prompt[] = [];
    private PromptMerger:PromptMerger;

    constructor(onWordComplete:NumberInputCallback){
        super();
        this.OnWordComplete = onWordComplete;
        
        this.PromptMerger = new PromptMerger();
        this.InitializePrompt();
        this.CreateChildren();
    }

    private InitializePrompt(){
        const midIndex = Math.floor(this.numWords / 2);

        for (let i = 0; i < midIndex; i++){
            this.Prompt.push("");
        }

        for (let i = midIndex; i < this.numWords; i++){
            this.Prompt.push(GetRandomWord());
        }
    }

    private CreateChildren(){
        for (let i = 0; i < this.numWords; i++){
            const newPromptUI = new Prompt(this.Prompt[i], "");
            this.PromptUIList.push(newPromptUI);
        }

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

        const currentPrompt = this.PromptUIList[Math.floor(this.PromptUIList.length / 2)];
        
        if (this.CurrentInput.length > currentPrompt.Prompt.length && input === " "){
            this.CompleteWord(currentPrompt);
        }
        else{
            currentPrompt.Input = this.CurrentInput;
        }

        this.PromptMerger.UpdatePrompt(this.PromptUIList);
    }

    private CompleteWord(currentPrompt:Prompt){
        const { correctText } = currentPrompt.GetText();
        this.OnWordComplete(correctText.length * 10);

        this.Prompt = this.Prompt.slice(1);
        this.Prompt.push(GetRandomWord());

        const midIndex = Math.floor(this.Prompt.length / 2);
        for (let i = 0; i < this.Prompt.length; i++){
            this.PromptUIList[i].Prompt = this.Prompt[i];

            if (i >= 1 && i <= midIndex){
                this.PromptUIList[i-1].Input = this.PromptUIList[i].Input;
            }
            if (i >= midIndex){
                this.PromptUIList[i].Input = "";
            }
        }

        this.CurrentInput = "";
        this.PromptMerger.UpdatePrompt(this.PromptUIList);
    }
}