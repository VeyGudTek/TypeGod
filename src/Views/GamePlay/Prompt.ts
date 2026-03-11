import { DrawText, GetCenterFromPosition } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { Colors } from "@Static/Styles";
import { BaseTransformView } from "@Views/.";

export class Prompt extends BaseTransformView{
    Prompt:string;
    Input:string;
    
    constructor(size:Vector2, position:Vector2, prompt:string, input:string){
        super(size, position);
        this.Position = GetCenterFromPosition(this.Position, this.Size);
        this.Prompt = prompt;
        this.Input = input;
    }

    Render(){
        const { disabledText, incorrectText, correctText } = this.GetText();

        DrawText(disabledText, Colors.font.disabled, this.Position, "center", this.Size.y);
        DrawText(incorrectText, Colors.font.error, this.Position, "center", this.Size.y);
        DrawText(correctText, Colors.font.base, this.Position, "center", this.Size.y);
    }

    GetText(){
        const inputLength = this.Input.length;
        const promptLength = this.Prompt.length;
        const maxLength = inputLength > promptLength ? inputLength : promptLength;

        let disabledText = this.Prompt.slice(inputLength);
        let correctText = "";
        let incorrectText = "";
        
        for (let i = 0; i < maxLength; i++){
            if (i > disabledText.length - 1){
                disabledText = " " + disabledText;
            }
            if (i >= inputLength){
                correctText += " ";
                incorrectText += " ";
                continue;
            }
            if (i < promptLength && this.Prompt[i] === this.Input[i]){
                incorrectText += " ";
                correctText += this.Prompt[i];
            }
            else if (i < promptLength && this.Prompt[i] !== this.Input[i]){
                correctText += " ";
                incorrectText += this.Prompt[i];
            }
            else{
                correctText += " ";
                incorrectText += this.Input[i];
            }
        }

        return {disabledText, correctText, incorrectText};
    }
}