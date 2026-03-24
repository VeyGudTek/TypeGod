export class Prompt{
    Prompt:string;
    Input:string;
    
    constructor(prompt:string, input:string){
        this.Prompt = prompt;
        this.Input = input;
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