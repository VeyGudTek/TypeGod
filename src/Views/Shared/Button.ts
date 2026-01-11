import { DrawRect } from "@Functions/.";
import { DrawText } from "@Functions/DrawText";
import { GetCenterFromPosition } from "@Functions/PositionConversion";
import type { BasicCallback, Vector2 } from "@Models/.";
import { Colors, Sizes } from "@Static/.";
import { BaseHoverView } from "@Views/Shared/.";

export class Button extends BaseHoverView{
    ClickCallBack:BasicCallback;
    Text:string;

    constructor(size:Vector2, position:Vector2, text:string, clickCallBack: BasicCallback){
        super(size, position);

        this.ClickCallBack = clickCallBack;
        this.Text = text;
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

        DrawText(
            this.Text, 
            Colors.font.base, 
            GetCenterFromPosition(this.Position, this.Size),
            "center",
            Sizes.text.base
        );
    }
}