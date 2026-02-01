import { DrawText } from "@Functions/DrawText";
import type { BasicCallback } from "@Models/Callbacks.type";
import type { Vector2 } from "@Models/Vector2.type";
import { Timer } from "@Services/TimeService";
import { Colors } from "@Static/Styles";
import { BaseTransformView } from "@Views/Shared";

export class DialogueText extends BaseTransformView{
    Text:string = "chfghdfghdfghddgrgrg\ndgrgrgrrgrgrgrggrrgrgr\nhhhhhhhhhhhhhfghfgh";
    TextSpeed:number = 35;
    Timer:Timer;
    CurrentIndex:number = 0;
    NextCallback:BasicCallback;

    constructor(onNext:BasicCallback, size:Vector2, position:Vector2){
        super(size, position);
        this.NextCallback = onNext;

        this.Timer = new Timer();
    }

    OnDialogueClick(){
        if (this.CurrentIndex >= this.Text.length){
            this.NextCallback();
        }
        else{
            this.CurrentIndex = this.Text.length;
        }
    }

    OnUpdate(){
        if (this.CurrentIndex < this.Text.length){
            this.CurrentIndex = Math.min(Math.round(this.Timer.GetElapsedTime()* this.TextSpeed), this.Text.length);
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