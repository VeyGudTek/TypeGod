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

    private GetText(){
        const inputLength = this.Input.length;
        const disabledText = this.Prompt.slice(inputLength);

        let correctText = "";
        let incorrectText = "";
        for (let i = inputLength; i < this.Input.length; i++){
            if (i < this.Prompt.length && this.Prompt[i] === this.Input[i]){
                correctText += this.Prompt[i];
            }
            else{
                incorrectText = this.Prompt.slice(i);
                break;
            }
        }

        return {disabledText, correctText, incorrectText};
    }
}