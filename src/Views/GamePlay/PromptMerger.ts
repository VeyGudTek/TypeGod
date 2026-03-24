import { BaseTransformView } from "@Views/Shared";
import type { Prompt } from "./Prompt";
import { DrawText, GetCenterFromPosition } from "@Functions/index";
import { Colors } from "@Static/index";

function GetPadding(padding:number){
    let spaces = "";

    for(let i = 0; i < padding; i ++){
        spaces += "|";
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
            
            if (index === 2){
                midIndex = charCount + Math.floor(combinedCorrect.length / 2);
            }
            charCount += correctText.length;
        })

        const halfCount = Math.floor(combinedCorrect.length / 2);
        if (midIndex < halfCount){
            combinedCorrect = GetPadding(halfCount - midIndex) + combinedCorrect;
            combinedDisabled = GetPadding(halfCount - midIndex) + combinedDisabled;
            combinedIncorrect = GetPadding(halfCount - midIndex) + combinedIncorrect;
        }
        else if (midIndex > halfCount){
            combinedCorrect += GetPadding(midIndex - halfCount);
            combinedDisabled += GetPadding(midIndex - halfCount);
            combinedIncorrect += GetPadding(midIndex - halfCount);
        }
        console.log(midIndex, halfCount)

        // let cutFront = true;
        // while (combinedCorrect.length > 20){
        //     if (cutFront){
        //         combinedCorrect = combinedCorrect.slice(1);
        //         combinedDisabled = combinedDisabled.slice(1);
        //         combinedIncorrect = combinedIncorrect.slice(1);
        //     }
        //     else{
        //         combinedCorrect = combinedCorrect.slice(0, combinedCorrect.length - 1);
        //         combinedDisabled = combinedDisabled.slice(0, combinedDisabled.length - 1);
        //         combinedIncorrect = combinedIncorrect.slice(0, combinedIncorrect.length - 1);
        //     }
        //     cutFront = !cutFront;
        // }

        this.MergedCorrect = combinedCorrect;
        this.MergedDisabled = combinedDisabled;
        this.MergedIncorrect = combinedIncorrect;
    }

    Render(){
        DrawText(this.MergedDisabled, Colors.font.disabled, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);
        DrawText(this.MergedIncorrect, Colors.font.error, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);
        DrawText(this.MergedCorrect, Colors.font.base, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);

        DrawText("|", Colors.font.base, GetCenterFromPosition(this.Position, this.Size), "center", this.Size.y);
    }
}