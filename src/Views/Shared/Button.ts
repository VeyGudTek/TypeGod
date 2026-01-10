import { DrawRect } from "@Functions/.";
import type { Vector2, View } from "@Models/.";

export class Button implements View{
    Children:View[] = [];
    Size:Vector2;
    Position:Vector2;
    Color:string;
    IsHover:boolean;

    constructor(x:number, y:number, width:number, height:number){
        this.Position = {
            x: x,
            y: y
        }
        this.Size = {
            x:width,
            y:height
        }

        this.Color = "#9da4c3";
        this.IsHover = false;
    }

    OnUpdate(mousePosition: Vector2){
        const withinXBound = mousePosition.x <= (this.Position.x + this.Size.x / 2) && mousePosition.x >= (this.Position.x - this.Size.x / 2)
        const withinYBound = mousePosition.y <= (this.Position.y + this.Size.y / 2) && mousePosition.y >= (this.Position.y - this.Size.y / 2)

        if (withinXBound && withinYBound){
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