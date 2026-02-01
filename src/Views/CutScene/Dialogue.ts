import type { Vector2 } from "@Models/Vector2.type";
import { BaseHoverView, Panel } from "@Views/Shared";
import { DialogueText } from "./DialogueText";
import type { BasicCallback } from "@Models/Callbacks.type";

export class Dialogue extends BaseHoverView{
    TextDialogue:DialogueText;
    NextPage: BasicCallback;

    constructor(nextPage:BasicCallback, initialText: string, size:Vector2, position:Vector2){
        super(size, position);
        this.NextPage = nextPage;

        const textPanel = new Panel(size, position);
        this.TextDialogue = new DialogueText(() => this.OnDialogueFinish(), {x: size.x * .8, y: size.y * .7}, position);
        this.TextDialogue.SetDialogueText(initialText);

        this.Children.push(textPanel, this.TextDialogue);
    }

    OnDialogueFinish(){
        this.NextPage();
    }

    OnNextPage(nextText:string){
        this.TextDialogue.SetDialogueText(nextText);
    }

    OnClick(){
        if (this.Hovering){
            this.TextDialogue.OnDialogueClick();
        }
    }
}