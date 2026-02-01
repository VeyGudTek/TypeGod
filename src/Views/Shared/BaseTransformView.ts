import { GetPositionFromCenter, IsWithinRectangle } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseView } from "./BaseView";
import { windowProvider } from "@Services/WindowProvider";

export class BaseTransformView extends BaseView{
    Size:Vector2;
    Position:Vector2;

    constructor(size:Vector2, position:Vector2){
        super();
        this.Size = {
            x: windowProvider.WindowSize.x * size.x,
            y: windowProvider.WindowSize.y * size.y
        };
        this.Position = GetPositionFromCenter({
            x: windowProvider.WindowSize.x * position.x,
            y: windowProvider.WindowSize.y * position.y
        }, this.Size);
    }

    CheckHover(mousePosition: Vector2){
        return IsWithinRectangle(mousePosition, this.Position, this.Size);
    }
}