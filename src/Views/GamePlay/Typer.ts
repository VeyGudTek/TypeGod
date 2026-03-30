import type { NumberInputCallback } from "@Models/Callbacks.type";
import { wordList } from "@Static/index";
import { BaseView, Label, Panel } from "@Views/Shared";
import { Prompt } from "./Prompt";
import { PromptMerger } from "./PromptMerger";
import { ComboTracker } from "./ComboTracker";

function GetRandomWord(){
    const listLength = wordList.length;
    const index = Math.floor(Math.random() * listLength)
    return wordList[index];
}

export class Typer extends BaseView{
    private readonly numWords = 13;

    private Prompt:string[] = [];
    private CurrentInput = "";
    private ComboTracker:ComboTracker = new ComboTracker();
    private ComboLabel:Label;

    private OnWordComplete:NumberInputCallback;

    private PromptUIList:Prompt[] = [];
    private PromptMerger:PromptMerger;

    constructor(onWordComplete:NumberInputCallback){
        super();
        this.OnWordComplete = onWordComplete;
        
        this.PromptMerger = new PromptMerger();
        this.ComboLabel = new Label({x:.1, y: .05}, {x: .9, y: .1}, "x0", "center");

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

        const promptPanel = new Panel({x:.75, y: .1}, {x: .43, y: .1});
        const comboPanel = new Panel({x:.1, y: .1}, {x: .9, y: .1});
        this.PromptMerger.UpdatePrompt(this.PromptUIList);

        this.Children.push(promptPanel, comboPanel, this.PromptMerger, this.ComboLabel);
    }

    OnKey(input:string){
        if (input.length === 1){
            this.CurrentInput += input;
            this.ComboTracker.AddCount();
        }

        if (input === "Backspace" && this.CurrentInput.length > 0){
            this.CurrentInput = this.CurrentInput.slice(0, this.CurrentInput.length - 1);
            this.ComboTracker.Reset();
        }

        const currentPrompt = this.PromptUIList[Math.floor(this.PromptUIList.length / 2)];
            
        if (this.CurrentInput.length > currentPrompt.Prompt.length && input === " "){
            this.ComboTracker.SubtractCount();
            this.CompleteWord(currentPrompt);
        }
        else{
            currentPrompt.Input = this.CurrentInput;
            if (currentPrompt.GetText().incorrectText.trim().length > 0){
                this.ComboTracker.Reset();
            }
        }

        this.PromptMerger.UpdatePrompt(this.PromptUIList);
        this.ComboLabel.Text = `x${this.ComboTracker.GetCombo()}`;
    }

    private CompleteWord(currentPrompt:Prompt){
        const { correctText } = currentPrompt.GetText();
        this.OnWordComplete(correctText.length * this.ComboTracker.GetMultiplier());
        console.log(this.ComboTracker.GetMultiplier());

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