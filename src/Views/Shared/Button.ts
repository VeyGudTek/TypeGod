import { DrawRect } from "@Functions/.";
import { GetCenterFromPosition } from "@Functions/PositionConversion";
import type { BasicCallback, Vector2 } from "@Models/.";
import { Colors } from "@Static/.";
import { BaseHoverView, Label } from "@Views/Shared/.";

export class Button extends BaseHoverView{
    ClickCallBack:BasicCallback;

    constructor(size:Vector2, position:Vector2, text:string, clickCallBack: BasicCallback){
        super(size, position);

        this.ClickCallBack = clickCallBack;
        const labelSize = {x: size.x * .8, y: size.y * .8}
        this.Children.push(new Label(labelSize, GetCenterFromPosition(position, size), text))
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
        DrawRect(this.Position, this.Size, this.Hovering ? Colors.button.hover : Colors.button.base, Colors.border.base);
    }
}