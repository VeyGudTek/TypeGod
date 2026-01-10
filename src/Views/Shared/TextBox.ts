import { IsWithinRectangle, DrawRect } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseView } from "@Views/Shared/.";

export class TextBox extends BaseView{
    Color:string;
    IsHover:boolean;

    constructor(size:Vector2, position:Vector2){
        super(size, position);

        this.Color = "#9da4c3";
        this.IsHover = false;
    }

    OnUpdate(mousePosition: Vector2){
        if (IsWithinRectangle(mousePosition, this.Position, this.Size)){
            this.OnHover();
        }
        else{
            this.OnNoHover();
        }

        this.Render();
    }

    private OnHover(){
        if (!this.IsHover){
            this.Color = "#6b749d";
            this.IsHover = true;
        }
    }

    private OnNoHover(){
        if (this.IsHover){
            this.Color = "#9da4c3";
            this.IsHover = false;
        }
    }

    OnClick(){
        if (this.IsHover){
            console.log("ButtonClicked");
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Color);
    }
}