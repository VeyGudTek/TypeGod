import type { Vector2, BasicCallback } from "@Models/.";
import { BaseHoverView, Panel } from "@Views/Shared";
import { DialogueText } from "./DialogueText";

export class Dialogue extends BaseHoverView{
    BackPanel:Panel;
    TextDialogue:DialogueText;

    constructor(nextPage:BasicCallback, size:Vector2, position:Vector2, initialText?: string){
        super(size, position);

        this.BackPanel = new Panel(size, position);
        this.TextDialogue = new DialogueText(() => nextPage(), {x: size.x * .8, y: size.y * .6}, position);
        this.TextDialogue.SetDialogueText(initialText);

        this.Children.push(this.BackPanel, this.TextDialogue);
    }

    OnNextPage(nextText?:string){
        const showingPanel = this.Children.includes(this.BackPanel);

        if (nextText !== undefined && !showingPanel){
            this.Children.splice(0, 0, this.BackPanel);
        }
        else if (nextText === undefined && showingPanel){
            this.RemoveChild(this.BackPanel);
        }

        this.TextDialogue.SetDialogueText(nextText);
    }

    OnClick(){
        if (this.TextDialogue.GetCurrentText() === "" || this.Hovering){
            this.TextDialogue.OnDialogueClick();
        }
    }
}