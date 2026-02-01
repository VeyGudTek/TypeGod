import { DrawText } from "@Functions/DrawText";
import type { BasicCallback } from "@Models/Callbacks.type";
import type { Vector2 } from "@Models/Vector2.type";
import { Colors } from "@Static/Styles";
import { BaseTransformView } from "@Views/Shared";

export class DialogueText extends BaseTransformView{
    Text:string = "tes string gdfgdfgdfgdfgdfgdfggggggggggggggggg\nggggggggggg\ngggggggggggg\nggggggggggggggggggggggggggggggggggggggggggggggg";
    CurrentIndex:number = 0;
    NextCallback:BasicCallback;

    constructor(onNext:BasicCallback, size:Vector2, position:Vector2){
        super(size, position);

        this.NextCallback = onNext;
    }

    OnDialogueClick(){
        if (this.CurrentIndex >= this.Text.length){
            this.NextCallback();
        }
        else{
            this.CurrentIndex = this.Text.length;
        }
    }

    Render(){
        DrawText(this.Text.slice(0, this.CurrentIndex),
            Colors.font.base,
            this.Position,
            "start",
            this.Size.y / 6
        );
    }
}