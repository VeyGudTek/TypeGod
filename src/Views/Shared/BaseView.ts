import type { Vector2, View } from "@Models/.";

export class BaseView implements View{
    Children:View[] = [];
    Size:Vector2;
    Position:Vector2;

    constructor(size:Vector2, position:Vector2){
        this.Size = size;
        this.Position = position;
    }
}