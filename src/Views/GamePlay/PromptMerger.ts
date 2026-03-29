import { BaseTransformView } from "@Views/Shared";
import type { Prompt } from "./Prompt";
import { DrawText, GetCenterFromPosition } from "@Functions/index";
import { Colors } from "@Static/index";

function GetPadding(padding:number){
    let spaces = "";

    for(let i = 0; i < padding; i ++){
        spaces += " ";
    }

    return spaces;
}

export class PromptMerger extends BaseTransformView{
    private MergedCorrect:string = "";
    private MergedDisabled:string = "";
    private MergedIncorrect:string = "";

    constructor(){
        super({x:.75, y: .05}, {x: .5, y: .1});
    }

    UpdatePrompt(promptList:Prompt[]){
        let charCount = 0;
        let midIndex = 0;

        let combinedCorrect = "";
        let combinedDisabled = "";
        let combinedIncorrect = "";

        promptList.forEach((prompt, index) => {
            const { correctText, disabledText, incorrectText } = prompt.GetText();
            combinedCorrect += correctText + " ";
            combinedDisabled += disabledText + " ";
            combinedIncorrect += incorrectText + " ";
            
            if (index === Math.floor(promptList.length / 2)){
                midIndex = charCount + Math.floor(correctText.length / 2);
            }
            charCount += correctText.length + 1;
        })

        const halfCount = Math.floor(combinedCorrect.length / 2);
        if (midIndex < halfCount){
            combinedCorrect =   GetPadding((halfCount - midIndex) * 2) + combinedCorrect;
            combinedDisabled =  GetPadding((halfCount - midIndex) * 2) + combinedDisabled;
            combinedIncorrect = GetPadding((halfCount - midIndex) * 2) + combinedIncorrect;
        }
        else if (midIndex > halfCount){
            combinedCorrect +=   GetPadding((midIndex - halfCount) * 2);
            combinedDisabled +=  GetPadding((midIndex - halfCount) * 2);
            combinedIncorrect += GetPadding((midIndex - halfCount) * 2);
        }

        const maxLength = 48;
        if (combinedCorrect.length > maxLength){
            const startSplice = Math.floor((combinedCorrect.length - maxLength) / 2);

            combinedCorrect = combinedCorrect.slice(startSplice, startSplice + maxLength);
            combinedDisabled = combinedDisabled.slice(startSplice, startSplice + maxLength);
            combinedIncorrect = combinedIncorrect.slice(startSplice, startSplice + maxLength);
        }

        this.MergedCorrect = combinedCorrect;
        this.MergedDisabled = combinedDisabled;
        this.MergedIncorrect = combinedIncorrect;
    }

    Render(){
        DrawText(this.MergedDisabled, Colors.font.disabled, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);
        DrawText(this.MergedIncorrect, Colors.font.error, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);
        DrawText(this.MergedCorrect, Colors.font.base, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);
        
        //Debug Center
        //DrawText("|", Colors.font.base, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);
    }
}