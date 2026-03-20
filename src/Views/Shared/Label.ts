import type { Vector2, AlignType } from "@Models/.";
import { BaseTransformView } from "./BaseTransformView";
import { DrawText, GetCenterFromPosition, } from "@Functions/.";
import { Colors } from "@Static/.";

export class Label extends BaseTransformView{
    Text:string;
    Align: AlignType;

    constructor(size:Vector2, position:Vector2, text:string, align:AlignType){
        super(size, position);
        this.Position = GetCenterFromPosition(this.Position, this.Size);
        this.Text = text;
        this.Align = align;
    }

    Render(){
        DrawText(this.Text, Colors.font.base, this.Position, this.Align, this.Size.y);
    }
}