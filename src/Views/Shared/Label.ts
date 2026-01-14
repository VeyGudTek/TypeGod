import type { Vector2 } from "@Models/.";
import { BaseView } from "./BaseView";
import { DrawText } from "@Functions/.";
import { Colors } from "@Static/.";

export class Label extends BaseView{
    Text:string;

    constructor(size:Vector2, position:Vector2, text:string){
        super(size, position);
        this.Text = text;
    }

    OnUpdate(){
        this.Render();
    }

    private Render(){
        DrawText(this.Text, Colors.font.base, this.Position, "center", this.Size.y);
    }
}