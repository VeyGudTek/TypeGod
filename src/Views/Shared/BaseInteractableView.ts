import { IsWithinRectangle } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseView } from "@Views/Shared/.";

export class BaseInteractableView extends BaseView{
    Hovering:boolean = false;

    OnUpdate(mousePosition: Vector2){
        if (IsWithinRectangle(mousePosition, this.Position, this.Size)){
            this.Hovering = true;
        }
        else{
            this.Hovering = false;
        }
    }
}