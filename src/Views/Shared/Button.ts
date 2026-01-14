import { DrawRect } from "@Functions/.";
import { GetCenterFromPosition } from "@Functions/.";
import type { BasicCallback, UpdateArguments, Vector2 } from "@Models/.";
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

    OnUpdate(updateArguments:UpdateArguments){
        super.OnUpdate(updateArguments);

        this.Render(updateArguments.mouseDown);
    }

    OnClick(){
        if (this.Hovering){
            this.ClickCallBack();
        }
    }

    Render(mouseDown:boolean){
        let currentColor = Colors.button.base;
        if (this.Hovering){
            currentColor = mouseDown ? Colors.button.down : Colors.button.hover;
        }

        DrawRect(this.Position, this.Size, currentColor, Colors.border.base);
    }
}