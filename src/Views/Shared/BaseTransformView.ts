import { IsWithinRectangle } from "@Functions/.";
import type { Vector2 } from "@Models/.";
import { BaseView } from "./BaseView";

export class BaseTransformView extends BaseView{
    Size:Vector2;
    Position:Vector2;

    constructor(size:Vector2, position:Vector2){
        super();
        this.Size = size;
        this.Position = position;
    }

    CheckHover(mousePosition: Vector2){
        return IsWithinRectangle(mousePosition, this.Position, this.Size);
    }
}