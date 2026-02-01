import type { Vector2 } from "@Models/.";
import { BaseTransformView } from "./BaseTransformView";
import { DrawText, GetCenterFromPosition } from "@Functions/.";
import { Colors } from "@Static/.";

export class Label extends BaseTransformView{
    Text:string;

    constructor(size:Vector2, position:Vector2, text:string){
        super(size, position);
        this.Position = GetCenterFromPosition(this.Position, this.Size);
        this.Text = text;
    }

    Render(){
        DrawText(this.Text, Colors.font.base, this.Position, "center", this.Size.y);
    }
}