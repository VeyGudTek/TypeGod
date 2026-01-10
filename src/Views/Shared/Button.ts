import { DrawRect } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { eventManager } from "@Services/EventManager";
import type { View } from "@Views/.";

export class Button implements View{
    Children:View[] = [];
    Size:Vector2;
    Position:Vector2;

    constructor(x:number, y:number, width:number, height:number){
        this.Position = {
            x: x,
            y: y
        }
        this.Size = {
            x:width,
            y:height
        }

        eventManager.RegisterUpdateEvent((mousePosition) => this.OnUpdate(mousePosition))
    }

    Render(){
        DrawRect(this.Position, this.Size, "Grey");
    }

    private OnUpdate(mousePosition: Vector2){
        this.Position = mousePosition;
        eventManager.TriggerRender();
    }
}