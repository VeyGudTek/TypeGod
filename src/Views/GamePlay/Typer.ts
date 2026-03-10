import { DrawText } from "@Functions/DrawText";
import type { OnWordCompleteCallback } from "@Models/Callbacks.type";
import { windowProvider } from "@Services/WindowProvider";
import { wordList } from "@Static/index";
import { BaseView } from "@Views/Shared";

export class Typer extends BaseView{
    Prompt:string[] = [];
    CurrentInput = "";

    OnWordComplete:OnWordCompleteCallback;

    constructor(onWordComplete:OnWordCompleteCallback){
        super();
        this.OnWordComplete = onWordComplete;

        this.InitializePrompt();
    }

    private InitializePrompt(){
        this.Prompt = [];
        const listLength = wordList.length;

        for (let i = 0; i < 5; i++){
            const index = Math.floor(Math.random() * listLength);
            this.Prompt.push(wordList[index]);
        }
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

    Render(){
        DrawText(
            this.BuildDisplayString(), 
            "black", 
            {
                x: windowProvider.WindowSize.x / 10, 
                y: windowProvider.WindowSize.y / 2
            }, 
            "center", 
            3);
    }

    private BuildDisplayString(){
        return "";
    }
}