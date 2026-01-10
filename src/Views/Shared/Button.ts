import { DrawRect } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseHoverView } from "@Views/Shared/.";

export class Button extends BaseHoverView{
    constructor(size:Vector2, position:Vector2){
        super(size, position);
    }

    OnUpdate(mousePosition: Vector2){
        super.OnUpdate(mousePosition);

        this.Render();
    }

    OnClick(){
        if (this.Hovering){
            console.log("ButtonClicked");
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Hovering ? "#549d87" : "#88b2a9" );
    }
}