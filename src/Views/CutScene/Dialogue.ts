import type { Vector2 } from "@Models/Vector2.type";
import { BaseHoverView, Panel } from "@Views/Shared";
import { DialogueText } from "./DialogueText";

export class Dialogue extends BaseHoverView{
    TextDialogue:DialogueText;

    constructor(size:Vector2, position:Vector2){
        super(size, position);

        const textPanel = new Panel(size, position);
        this.TextDialogue = new DialogueText(() => this.OnTextFinish(), {x: size.x * .8, y: size.y * .7}, position);

        this.Children.push(textPanel, this.TextDialogue);
    }

    OnTextFinish(){
        console.log("text finish");
    }

    OnClick(){
        if (this.Hovering){
            this.TextDialogue.OnDialogueClick();
        }
    }
}