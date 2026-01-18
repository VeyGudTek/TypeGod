import { IsWithinRectangle } from "@Functions/IsWithinRectangle";
import type { Vector2 } from "@Models/Vector2.type";
import { BaseView } from "@Views/Shared/.";

export abstract class BaseHoverView extends BaseView{
    Hovering:boolean = false;
    MouseDown:boolean = false;

    CheckHover(mousePosition: Vector2){
        return IsWithinRectangle(mousePosition, this.Position, this.Size);
    }

    OnUpdate(){
        this.Hovering = false;
        this.MouseDown = false;
    }

    OnHover(){
        this.Hovering = true;
    }

    OnMouseDown(){
        this.MouseDown = true;
    }
}