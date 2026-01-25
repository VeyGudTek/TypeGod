import { IsWithinRectangle } from "@Functions/.";
import type { Vector2, View } from "@Models/.";

export class BaseTransformView implements View{
    Children:View[] = [];
    Priority: number = 0;
    Size:Vector2;
    Position:Vector2;

    constructor(size:Vector2, position:Vector2){
        this.Size = size;
        this.Position = position;
    }

    CheckHover(mousePosition: Vector2){
        return IsWithinRectangle(mousePosition, this.Position, this.Size);
    }
}