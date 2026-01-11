import { DrawRect } from "@Functions/.";
import type { BasicCallback, Vector2 } from "@Models/.";
import { BaseInteractableView } from "@Views/Shared/.";

export class Button extends BaseInteractableView{
    ClickCallBack:BasicCallback;

    constructor(size:Vector2, position:Vector2, clickCallBack: BasicCallback){
        super(size, position);

        this.ClickCallBack = clickCallBack;
    }

    OnUpdate(mousePosition: Vector2){
        super.OnUpdate(mousePosition);

        this.Render();
    }

    OnClick(){
        if (this.Hovering){
            this.ClickCallBack();
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, this.Hovering ? "#549d87" : "#88b2a9" , "black");
    }
}