import { IsWithinRectangle } from "@Functions/.";
import type { BasicCallback, Vector2 } from "@Models/.";
import { BaseView } from "@Views/Shared/.";

export class BaseInteractableView extends BaseView{
    ClickCallBack:BasicCallback;
    Hovering:boolean = false;

    constructor(size:Vector2, position:Vector2, clickCallBack:BasicCallback){
        super(size, position);

        this.ClickCallBack = clickCallBack;
    }

    OnUpdate(mousePosition: Vector2){
        if (IsWithinRectangle(mousePosition, this.Position, this.Size)){
            this.Hovering = true;
        }
        else{
            this.Hovering = false;
        }
    }

    OnClick(){
        if (this.Hovering){
            this.ClickCallBack();
        }
    }
}